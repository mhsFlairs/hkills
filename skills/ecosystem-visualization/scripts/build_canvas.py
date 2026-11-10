"""Build an offline ecosystem canvas from an explicit evidence-backed model."""
from pathlib import Path
from collections import Counter
import json, re, math, heapq, argparse

def prepare(model):
    nodes={n['id']:dict(n) for n in model['nodes']}
    assert len(nodes)==len(model['nodes']), 'Node IDs must be unique'
    assert nodes and model['width']>0 and model['height']>0
    assert all(n.get('role') in {'frontend','service','database'} for n in nodes.values()), 'Use explicit endpoint roles'
    for n in nodes.values():
        n.setdefault('width',350);n.setdefault('height',128)
        assert n['x']>=40 and n['y']>=380 and n['x']+n['width']<model['width']-20 and n['y']+n['height']<model['height']-150, 'Station outside the canvas plot'
    cards=list(nodes.values())
    for i,a in enumerate(cards):
        for b in cards[i+1:]:
            assert not(a['x']<b['x']+b['width'] and a['x']+a['width']>b['x'] and a['y']<b['y']+b['height'] and a['y']+a['height']>b['y']), 'Station cards overlap'
    links=[]
    for i,e in enumerate(model['edges']):
        c=dict(e);c.setdefault('id','e'+str(i+1));c['key']=c['id']
        assert c['start'] in nodes and c['end'] in nodes, 'Unknown endpoint'
        c.setdefault('kind','rabbit' if c.get('via') else 'data' if nodes[c['end']]['role']=='database' else 'frontend' if nodes[c['start']]['role']=='frontend' else 'api')
        assert c['kind'] in {'frontend','api','data','rabbit'}, 'Unknown flow kind'
        assert c['kind']!='rabbit' or c.get('via'), 'Name the evidenced message route'
        c.setdefault('main_route',True);links.append(c)
    assert len({e['id'] for e in links})==len(links), 'Edge IDs must be unique'
    inc=Counter(c['end'] for c in links);out=Counter(c['start'] for c in links)
    for k,n in nodes.items():n['station_type']='entry' if inc[k]==0 else 'destination' if out[k]==0 else 'interchange' if inc[k]+out[k]>=5 else 'station'
    journeys=model.get('journeys',{})
    for j in journeys.values():
        assert set(j['nodes'])<=set(nodes), 'Unknown journey station'
        j.setdefault('links',[c['id'] for c in links if c['start'] in j['nodes'] and c['end'] in j['nodes']])
        assert set(j['links'])<={c['id'] for c in links}, 'Unknown journey link'
        group=set(j['nodes']);assert all(c['start'] in group and c['end'] in group for c in links if c['id'] in j['links']), 'Journey link outside its stations'
    W,H,pitch=model["width"],model["height"],20
    xmin,ymin,xmax,ymax=40,350,W-40,H-150
    def cell(p):return (round((p[0]-xmin)/pitch),round((p[1]-ymin)/pitch))
    def point(c):return (xmin+c[0]*pitch,ymin+c[1]*pitch)
    nx,ny=int((xmax-xmin)/pitch),int((ymax-ymin)/pitch)
    blocked=set()
    for n in nodes.values():
        for ix in range(nx+1):
            x=xmin+ix*pitch
            if n['x']-18<x<n['x']+n['width']+18:
                for iy in range(ny+1):
                    y=ymin+iy*pitch
                    if n['y']-18<y<n['y']+n['height']+18:blocked.add((ix,iy))
    directions=[(1,0),(1,1),(0,1),(-1,1),(-1,0),(-1,-1),(0,-1),(1,-1)]
    traffic=Counter()
    def port(n,side,kind):
        shift={'frontend':-28,'api':-8,'data':12,'rabbit':32}[kind]
        x,y,w,h=n['x'],n['y'],n['width'],n['height']
        if side=='e':return (x+w,y+h/2+shift),(1,0)
        if side=='w':return (x,y+h/2+shift),(-1,0)
        if side=='n':return (x+w/2+shift,y),(0,-1)
        return (x+w/2+shift,y+h),(0,1)
    def sides(a,b):
        dx=(b['x']+b['width']/2)-(a['x']+a['width']/2);dy=(b['y']+b['height']/2)-(a['y']+a['height']/2)
        if abs(dx)>=abs(dy)*.8:return ('e','w') if dx>=0 else ('w','e')
        return ('s','n') if dy>=0 else ('n','s')
    def search(start,end):
        def heuristic(p):
            dx,dy=abs(end[0]-p[0]),abs(end[1]-p[1]);return pitch*(max(dx,dy)+(math.sqrt(2)-1)*min(dx,dy))
        startstate=(*start,-1);cost={startstate:0};parent={};serial=0
        todo=[(heuristic(start),serial,startstate)]
        while todo:
            _,_,state=heapq.heappop(todo);x,y,heading=state;here=(x,y)
            if here==end:
                path=[here]
                while state in parent:state=parent[state];path.append(state[:2])
                return list(reversed(path))
            for direction,(dx,dy) in enumerate(directions):
                nxt=(x+dx,y+dy)
                if not(0<=nxt[0]<=nx and 0<=nxt[1]<=ny) or nxt in blocked:continue
                if dx and dy and ((x+dx,y) in blocked or (x,y+dy) in blocked):continue
                bend=0 if heading<0 or heading==direction else 17
                travel=pitch*(math.sqrt(2) if dx and dy else 1)
                value=cost[state]+travel+bend+min(70,traffic[nxt]*18)
                ns=(*nxt,direction)
                if value>=cost.get(ns,float('inf')):continue
                cost[ns]=value;parent[ns]=state;serial+=1;heapq.heappush(todo,(value+heuristic(nxt),serial,ns))
        raise RuntimeError('No metro path found')
    def compress(points):
        result=[]
        for p in points:
            if result and math.dist(p,result[-1])<.05:continue
            result.append(p)
            while len(result)>=3:
                a,b,c=result[-3:]
                cross=(b[0]-a[0])*(c[1]-b[1])-(b[1]-a[1])*(c[0]-b[0])
                if abs(cross)>.01:break
                result.pop(-2)
        return result
    def rounded(points):
        d=f'M{points[0][0]:.2f} {points[0][1]:.2f}'
        for a,b,c in zip(points,points[1:],points[2:]):
            da,db=math.dist(a,b),math.dist(b,c);r=min(12,da/3,db/3)
            if not da or not db:continue
            p=(b[0]+(a[0]-b[0])*r/da,b[1]+(a[1]-b[1])*r/da);q=(b[0]+(c[0]-b[0])*r/db,b[1]+(c[1]-b[1])*r/db)
            d+=f'L{p[0]:.2f} {p[1]:.2f}Q{b[0]:.2f} {b[1]:.2f} {q[0]:.2f} {q[1]:.2f}'
        return d+f'L{points[-1][0]:.2f} {points[-1][1]:.2f}'
    order=sorted(links,key=lambda c:(not c['main_route'],c['kind']!='rabbit',c['key']))
    for c in order:
        a,b=nodes[c['start']],nodes[c['end']];sa,sb=sides(a,b)
        p,dp=port(a,sa,c['kind']);q,dq=port(b,sb,c['kind'])
        outerp=(p[0]+dp[0]*52,p[1]+dp[1]*52);outerq=(q[0]+dq[0]*52,q[1]+dq[1]*52)
        s,t=cell(outerp),cell(outerq)
        assert s not in blocked and t not in blocked,(c['key'],s,t)
        path=search(s,t)
        for v in path[2:-2]:traffic[v]+=1
        points=compress([p,outerp]+[point(v) for v in path]+[outerq,q])
        samples=[]
        for a,b in zip(points,points[1:]):
            count=max(1,math.ceil(math.dist(a,b)/20))
            samples += [(a[0]+(b[0]-a[0])*j/count,a[1]+(b[1]-a[1])*j/count) for j in range(count)]
        samples.append(points[-1])
        c.update(path=rounded(points),points=samples,start_port=p,end_port=q)

    return dict(model,nodes=list(nodes.values()),edges=links,journeys=journeys)

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('model',type=Path);p.add_argument('output',type=Path)
    p.add_argument('--shell',type=Path,default=Path(__file__).resolve().parents[1]/'assets/ecosystem-canvas-starter.html')
    args=p.parse_args();model=prepare(json.loads(args.model.read_text(encoding='utf-8')))
    data=json.dumps(model,ensure_ascii=False).replace('<',r'\u003c').replace('>',r'\u003e').replace('&',r'\u0026')
    source=args.shell.read_text(encoding='utf-8')
    source,count=re.subn(r'(<script id="ecosystem-data" type="application/json">)[\s\S]*?(</script>)',lambda m:m[1]+data+m[2],source,count=1)
    assert count==1, 'Missing data slot in canvas shell'
    args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(source,encoding='utf-8')
    print(f'Built {len(model["nodes"])} stations and {len(model["edges"])} connections: {args.output}')
if __name__=='__main__':main()
