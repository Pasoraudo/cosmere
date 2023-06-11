(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7971],{7971:(j,R,d)=>{"use strict";d.r(R),d.d(R,{AnalysisModule:()=>ut});var T=d(4521),D=d(2415),c=d(5595),e=d(2860),r=d(7489),i=d.n(r),s=d(5547),f=d(3378),l=d.n(f),u=d(5894),w=d.n(u),z=d(1063),C=d.n(z),S=d(9909);const h=b=>(b=>b.map(([N,g])=>({label:N,value:g})))(i().map((0,S.Hr)(b),(N,g)=>[g,N])),x=b=>{const N=Math.min(...b.map(m=>m.value)),g=Math.max(...b.map(m=>m.value));return b.map(m=>Object.assign(Object.assign({},m),{value:(m.value-N)/(g-N)}))};var a=d(5408),n=d(1101),t=d(5e3),o=d(1993),p=d(2285),U=d(2846),Z=d(9602),I=d(9808),E=d(9976),v=d(6479),P=d(9268);let F=(()=>{class b extends E.H{constructor(){super(),this.options={colors:{highlight:"#b11adc",highlightLight:"#d975f6",text:"#777",xAxis:"#eee",yAxis:"#999"},height:200,width:600,margin:{top:10,left:40,right:10,bottom:20},animationDuration:300,ticksInterval:10},this.id=(0,P.V)()}ngOnChanges(g){this.create()}ngAfterViewInit(){this.create()}create(){!this.data||0===this.data.length||(this.data=this.data.splice(0,10),this.element=document.getElementById(this.id+"-barchart"),this.initValues(),this.initScales(),this.initChart(),this.createAxis(),this.createBars())}initChart(){v.Ys(this.element).select("svg").remove(),this.svg=v.Ys(this.element).append("svg").attr("viewBox",`0 0 ${this.options.width} ${this.options.height+100}`)}initValues(){const g=Number(v.VV$(this.data.map(A=>A.value))),m=Number(v.Fp7(this.data.map(A=>A.value)));this.minValue=g<0?g-this.options.ticksInterval:0,this.maxValue=m}initScales(){this.yScale=v.BYU().domain([this.minValue,this.maxValue]).range([this.options.height-this.options.margin.bottom,this.options.margin.top]),this.xScale=v.tiA().domain(v.w6H(this.data.length)).range([this.options.margin.left+this.options.margin.right,this.options.width-this.options.margin.right]).paddingInner(this.calculatePadding(this.data.length))}getBarMaxWidth(){const g=window.innerWidth;return g<=768?g<=480?10:15:20}getBarColor(g,m=0){return`rgb(${(210+m).toString()}, ${(10+20*g+m).toString()}, ${(220-20*g+m).toString()})`}createBars(){this.svg.selectAll(".bar").data(this.data).enter().append("rect").classed("bar",!0).style("fill","transparent").style("display",m=>"number"==typeof m.value?"initial":"none").attr("x",(m,A)=>this.xScale(A)).attr("y",this.yScale(0)).attr("width",this.xScale.bandwidth()).attr("height",0).transition().style("fill",(m,A)=>this.getBarColor(A)).duration(this.options.animationDuration).delay((m,A)=>A*this.options.animationDuration/3).attr("x",(m,A)=>this.xScale(A)).attr("y",(m,A)=>this.yScale(m.value<0?0:m.value)).attr("width",this.xScale.bandwidth()).attr("height",(m,A)=>m.value<0?this.yScale(m.value)-this.yScale(0):this.yScale(0)-this.yScale(m.value))}createAxis(){const g=v.LLu(this.xScale).tickSize(-this.options.width).tickFormat((A,O)=>this.data[O].label.toUpperCase()),m=v.y4O(this.yScale).tickSize(-this.options.width).tickFormat(A=>`${A}`).ticks(this.options.ticksInterval);this.svg.append("g").attr("class","axis x-axis").attr("transform",`translate(0, ${this.options.height-15})`).call(g).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end"),this.svg.append("g").attr("class","axis y-axis").attr("transform",`translate(${+this.options.margin.left}, 0)`).call(m),this.svg.selectAll(".axis .domain").remove(),this.svg.selectAll(".axis .tick text").style("fill",this.options.colors.text),this.svg.selectAll(".y-axis .tick line").style("stroke",this.options.colors.yAxis),this.svg.selectAll(".x-axis .tick line").style("stroke",this.options.colors.xAxis)}calculatePadding(g){return 1-g*this.getBarMaxWidth()/this.options.width}}return b.\u0275fac=function(g){return new(g||b)},b.\u0275cmp=t.Xpm({type:b,selectors:[["bar-chart"]],inputs:{data:"data",options:"options"},features:[t.qOj,t.TTD],decls:1,vars:1,consts:[[1,"flex","flex-1",3,"id"]],template:function(g,m){1&g&&t._UZ(0,"div",0),2&g&&t.MGl("id","",m.id,"-barchart")},encapsulation:2}),b})();function H(b,N=256){const g=document.createElement("canvas");g.width=1,g.height=N;const m=g.getContext("2d");for(let A=0;A<N;++A)m.fillStyle=b(A/(N-1)),m.fillRect(0,N-A,1,1);return g}let B=(()=>{class b extends E.H{constructor(){super(),this.xLabel="",this.yLabel="",this.config={height:500,width:500,margin:{top:20,left:40,right:30,bottom:30},inset:{top:6,right:6,bottom:6,left:6},dot:{radius:20,strokeWidth:0,strokeColor:"white"},domain:{x:[0,1],y:[0,1]},padding:10,animationDuration:300,ticksInterval:10,color:v.Vaf},this.id=(0,P.V)()}ngOnChanges(g){this.create()}ngAfterViewInit(){this.create()}create(){!this.data||0===this.data.length||(this.element=document.getElementById(this.id+"-chart-3d"),this.initValues(),this.createColorBar(),this.initScales(),this.createAxis(),this.createSvg())}createColorBar(){const g=(({color:b,title:N,tickSize:g=6,width:m=36+g,height:A=320,marginTop:O=20,marginRight:$=10+g,marginBottom:J=20,marginLeft:V=5,ticks:_=A/64,tickFormat:W,tickValues:q}={})=>{const M=v.Ue8("svg").attr("width",m).attr("height",A).attr("viewBox",[0,0,m,A]).style("overflow","visible").style("display","block");let G,Q=Y=>Y.selectAll(".tick line").attr("x1",V-m+$);if(b.interpolate){const Y=Math.min(b.domain().length,b.range().length);G=b.copy().rangeRound(v.q$2(v.sXR(A-J,O),Y)),M.append("image").attr("x",V).attr("y",O).attr("width",m-V-$).attr("height",A-O-J).attr("preserveAspectRatio","none").attr("xlink:href",H(b.copy().domain(v.q$2(v.sXR(0,1),Y))).toDataURL())}else if(b.interpolator){if(G=Object.assign(b.copy().interpolator(v.uLU(A-J,O)),{range:()=>[A-J,O]}),M.append("image").attr("x",V).attr("y",O).attr("width",m-V-$).attr("height",A-O-J).attr("preserveAspectRatio","none").attr("xlink:href",H(b.interpolator()).toDataURL()),!G.ticks){if(void 0===q){const Y=Math.round(_+1);q=v.w6H(Y).map(nt=>v.VRg(b.domain(),nt/(Y-1)))}"function"!=typeof W&&(W=v.WUZ(void 0===W?",f":W))}}else if(b.invertExtent){const Y=b.thresholds?b.thresholds():b.quantiles?b.quantiles():b.domain(),nt=void 0===W?X=>X:"string"==typeof W?v.WUZ(W):W;G=v.BYU().domain([-1,b.range().length-1]).rangeRound([A-J,O]),M.append("g").selectAll("rect").data(b.range()).join("rect").attr("y",(X,tt)=>G(tt)).attr("x",V).attr("height",(X,tt)=>G(tt-1)-G(tt)).attr("width",m-$-V).attr("fill",X=>X),q=v.w6H(Y.length),W=X=>nt(Y[X],X)}else G=v.tiA().domain(b.domain()).rangeRound([A-J,O]),M.append("g").selectAll("rect").data(b.domain()).join("rect").attr("y",G).attr("x",V).attr("height",Math.max(0,G.bandwidth()-1)).attr("width",m-V-$).attr("fill",b),Q=()=>{};return M.append("g").attr("transform",`translate(${m-$},0)`).call(v.Khx(G).ticks(_,"string"==typeof W?W:void 0).tickFormat("function"==typeof W?W:void 0).tickSize(g).tickValues(q)).call(Q).call(Y=>Y.select(".domain").remove()).call(Y=>Y.append("text").attr("x",V-m+$).attr("y",0).attr("fill","currentColor").attr("text-anchor","start").attr("font-weight","bold").attr("class","title").text(N)),M.node()})({color:v.cJy([0,1],this.color),title:"Degree"});this.legendElement=document.getElementById(this.id+"-legend-bar"),v.Ys(this.legendElement).select("svg").remove(),this.legendElement.append(g)}initValues(){this.color=this.config.color,this.X=this.data.map(g=>g.x),this.Y=this.data.map(g=>g.y),this.Z=this.data.map(g=>g.z),this.labels=this.data.map(g=>g.label)}initScales(){const m=[this.config.height-this.config.margin.bottom-this.config.inset.bottom,this.config.margin.top+this.config.inset.top];this.xScale=v.BYU(this.config.domain.x,[this.config.margin.left+this.config.inset.left,this.config.width-this.config.margin.right-this.config.inset.right]),this.yScale=v.BYU(this.config.domain.y,m)}createAxis(){this.xAxis=v.LLu(this.xScale).ticks(this.config.width/80),this.yAxis=v.y4O(this.yScale).ticks(this.config.height/50)}createSvg(){v.Ys(this.element).select("svg").remove(),this.svg=v.Ys(this.element).append("svg").attr("width",this.config.width).attr("height",this.config.height).attr("viewBox",[0,0,this.config.width,this.config.height]).attr("style","max-width: 100%; this.options.height: auto; height: intrinsic;"),this.svg.append("g").attr("transform",`translate(0,${this.config.height-this.config.margin.bottom})`).call(this.xAxis).call(A=>A.select(".domain").remove()).call(A=>A.selectAll(".tick line").clone().attr("y2",this.config.margin.top+this.config.margin.bottom-this.config.height).attr("stroke-opacity",.1)).call(A=>A.append("text").attr("x",this.config.width).attr("y",this.config.margin.bottom-4).attr("fill","currentColor").attr("text-anchor","end").text(this.xLabel)),this.svg.append("g").attr("transform",`translate(${this.config.margin.left},0)`).call(this.yAxis).call(A=>A.select(".domain").remove()).call(A=>A.selectAll(".tick line").clone().attr("x2",this.config.width-this.config.margin.left-this.config.margin.right).attr("stroke-opacity",.1)).call(A=>A.append("text").attr("x",-this.config.margin.left).attr("y",10).attr("fill","currentColor").attr("text-anchor","start").text(this.yLabel));const m=v.w6H(this.X.length).filter(A=>!isNaN(this.X[A])&&!isNaN(this.Y[A]));this.svg.append("g").attr("stroke",this.config.dot.strokeColor).attr("stroke-width",this.config.dot.strokeWidth).selectAll("circle").data(m).join("circle").attr("cx",A=>this.xScale(this.X[A])).attr("cy",A=>this.yScale(this.Y[A])).attr("fill",A=>this.color(this.Z[A])).attr("r",this.config.dot.radius),this.svg.append("g").attr("font-family","sans-serif").attr("font-size",20).attr("stroke-linejoin","round").attr("stroke-linecap","round").selectAll("text").data(m).join("text").attr("x",A=>this.xScale(this.X[A])).attr("y",A=>this.yScale(this.Y[A])).text(A=>this.labels[A]).style("fill","white").style("text-anchor","middle").style("dominant-baseline","central")}}return b.\u0275fac=function(g){return new(g||b)},b.\u0275cmp=t.Xpm({type:b,selectors:[["chart-3d"]],inputs:{data:"data",xLabel:"xLabel",yLabel:"yLabel",config:"config"},features:[t.qOj,t.TTD],decls:3,vars:2,consts:[[1,"flex","flex-row"],[3,"id"],[1,"flex","flex-1","items-end","pb-10",3,"id"]],template:function(g,m){1&g&&(t.TgZ(0,"div",0),t._UZ(1,"div",1),t._UZ(2,"div",2),t.qZA()),2&g&&(t.xp6(1),t.MGl("id","",m.id,"-chart-3d"),t.xp6(1),t.MGl("id","",m.id,"-legend-bar"))},encapsulation:2}),b})();function L(b,N){if(1&b&&(t.TgZ(0,"div",16),t._uU(1),t.qZA()),2&b){const g=t.oxw(),m=g.index,A=g.$implicit;t.xp6(1),t.AsE("",m+1," \xba ",A.label,"")}}function K(b,N){if(1&b&&(t.TgZ(0,"div"),t.YNc(1,L,2,2,"div",15),t.qZA()),2&b){const g=N.index,m=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",g>=10*m&&g<10*m+10)}}function et(b,N){if(1&b&&(t.TgZ(0,"div"),t.TgZ(1,"div",13),t.YNc(2,K,2,1,"div",6),t.qZA(),t.qZA()),2&b){const g=t.oxw();t.xp6(2),t.Q6J("ngForOf",g.pagerankCosmere)}}const rt=function(){return[0,1,2,3,4,5,6,7,8]},it=[{path:"",component:(()=>{class b extends D.n{constructor(g,m){super(),this.relationshipApi=g,this.configurationApi=m,this.pagerankEigenvectorAndDegreeCentrality=[],this.configuration=(0,n.h)()}ngOnInit(){this.subscribe(this.relationshipApi.cosmereRelationships(),g=>this.onRelationshipsChanges(g)),this.subscribe(this.configurationApi.configuration(),g=>this.onConfigurationChanges(g)),this.relationshipApi.fetchAllCosmereRelationship()}analyseNetwork(g){const m=g.nodes(),A=(0,s.pagerank)(g,{getEdgeWeight:void 0,maxIterations:300});this.pagerankCosmere=h(A);const O=C()(g);this.betweennessCosmere=h(O);const $=l()(g);this.closenessCosmere=h($),this.closenessCosmere=(0,r.reject)(this.closenessCosmere,M=>1===M.value);const J=w()(g,{maxIterations:200});this.eigenvectorCosmere=h(J);const V=(0,a.degreeCentrality)(g);this.degreeCentralityCosmere=h(V);const _=x(this.pagerankCosmere),W=x(this.eigenvectorCosmere),q=x(this.degreeCentralityCosmere);this.pagerankEigenvectorAndDegreeCentrality=m.map(M=>({label:M,x:_.find(Q=>Q.label===M).value,y:W.find(Q=>Q.label===M).value,z:q.find(Q=>Q.label===M).value})).filter(M=>M.x>=.1&&M.y>.1)}onRelationshipsChanges(g){this.relationships=g,this.analyseNetwork(this.graph())}onConfigurationChanges(g){this.configuration=g,this.analyseNetwork(this.graph())}filterRelationships(g){let m=g;return this.configuration.books.length>0&&(m=m.filter(A=>this.configuration.books.includes(A.bookId))),m}graph(){const g=this.filterRelationships(this.relationships),m=new c.UndirectedGraph;return(0,e.df)(g).forEach(O=>m.addNode(O)),g.forEach(O=>m.addEdge(O.characterId1,O.characterId2)),m}}return b.\u0275fac=function(g){return new(g||b)(t.Y36(o.I),t.Y36(p.h))},b.\u0275cmp=t.Xpm({type:b,selectors:[["network"]],features:[t.qOj],decls:30,vars:6,consts:[[1,"inset-0","flex","flex-col","min-w-0","w-full","h-screen"],[1,"mr-6"],[1,"flex","flex-col","p-10"],[1,"flex","flex-col","p-10","grow"],[1,"text-xl","mb-5"],[1,"flex","flex-row","gap-10"],[4,"ngFor","ngForOf"],[1,"flex","flex-row","mt-5","gap-5"],[1,"flex","flex-auto","grow","p-6"],[1,"flex","flex-col","grow"],[1,"w-full",3,"data"],[1,"flex","flex-row","mt-5"],[1,"p-6"],[1,"flex","flex-col"],[1,"flex","flex-auto","w-full",3,"data"],["class","mb-3",4,"ngIf"],[1,"mb-3"]],template:function(g,m){1&g&&(t.TgZ(0,"div",0),t._UZ(1,"configuration",1),t.TgZ(2,"div",2),t.TgZ(3,"fuse-card",3),t.TgZ(4,"div",4),t._uU(5,"Lista de personajes m\xe1s relevantes por PageRank"),t.qZA(),t.TgZ(6,"div",5),t.YNc(7,et,3,1,"div",6),t.qZA(),t.qZA(),t.TgZ(8,"div",7),t.TgZ(9,"fuse-card",8),t.TgZ(10,"div",9),t.TgZ(11,"div",4),t._uU(12,"Eigenvector"),t.qZA(),t._UZ(13,"bar-chart",10),t.qZA(),t.qZA(),t.TgZ(14,"fuse-card",8),t.TgZ(15,"div",9),t.TgZ(16,"div",4),t._uU(17,"Betweenness"),t.qZA(),t._UZ(18,"bar-chart",10),t.qZA(),t.qZA(),t.TgZ(19,"fuse-card",8),t.TgZ(20,"div",9),t.TgZ(21,"div",4),t._uU(22,"Closeness"),t.qZA(),t._UZ(23,"bar-chart",10),t.qZA(),t.qZA(),t.qZA(),t.TgZ(24,"div",11),t.TgZ(25,"fuse-card",12),t.TgZ(26,"div",13),t.TgZ(27,"div",4),t._uU(28,"Protagonismo"),t.qZA(),t._UZ(29,"chart-3d",14),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&g&&(t.xp6(7),t.Q6J("ngForOf",t.DdM(5,rt)),t.xp6(6),t.Q6J("data",m.eigenvectorCosmere),t.xp6(5),t.Q6J("data",m.betweennessCosmere),t.xp6(5),t.Q6J("data",m.closenessCosmere),t.xp6(6),t.Q6J("data",m.pagerankEigenvectorAndDegreeCentrality))},directives:[U.B,Z.y,I.sg,I.O5,F,B],encapsulation:2}),b})()}];var at=d(393),ot=d(5804),ht=d(9373),lt=d(4613);let ut=(()=>{class b{}return b.\u0275fac=function(g){return new(g||b)},b.\u0275mod=t.oAB({type:b}),b.\u0275inj=t.cJS({imports:[[T.Bz.forChild(it),at.ZD,ot.J,ht.T,I.ez,lt.m]]}),b})()},6078:(j,R,d)=>{var T=d(6116),D=d(2954).Q6;function c(i,s){return"outbound"===i||"inbound"===i?s.directedSize+2*s.undirectedSize:"in"===i||"out"===i||"directed"===i?s.directedSize:2*s.undirectedSize}function e(i,s){var f=i[(s=s||"outbound")+"Neighbors"].bind(i),l=c(s,i),u=T.getPointerArray(l),w=T.getPointerArray(i.order);this.graph=i,this.neighborhood=new w(l),this.starts=new u(i.order+1),this.nodes=i.nodes();var C,S,y,h,a,z={},n=0;for(C=0,S=i.order;C<S;C++)z[this.nodes[C]]=C;for(C=0,S=i.order;C<S;C++)for(a=f(this.nodes[C]),this.starts[C]=n,y=0,h=a.length;y<h;y++)this.neighborhood[n++]=z[a[y]];this.starts[C]=l}function r(i,s,f){var l=i[(f=f||"outbound")+"Edges"].bind(i),u=c(f,i),w=T.getPointerArray(u),z=T.getPointerArray(i.order),C=D(s).fromMinimalEntry;this.graph=i,this.neighborhood=new z(u),this.weights=new Float64Array(u),this.outDegrees=new Float64Array(i.order),this.starts=new w(i.order+1),this.nodes=i.nodes();var y,h,x,a,n,t,o,p,U,S={},Z=0;for(y=0,h=i.order;y<h;y++)S[this.nodes[y]]=y;for(y=0,h=i.order;y<h;y++)for(o=l(n=this.nodes[y]),this.starts[y]=Z,x=0,a=o.length;x<a;x++)t=i.opposite(n,p=o[x]),U=C(p,i.getEdgeAttributes(p)),this.neighborhood[Z]=S[t],this.weights[Z++]=U,this.outDegrees[y]+=U;this.starts[y]=u}e.prototype.bounds=function(i){return[this.starts[i],this.starts[i+1]]},e.prototype.project=function(){var i=this,s={};return i.nodes.forEach(function(f,l){s[f]=Array.from(i.neighborhood.slice(i.starts[l],i.starts[l+1])).map(function(u){return i.nodes[u]})}),s},e.prototype.collect=function(i){var s,f,l={};for(s=0,f=i.length;s<f;s++)l[this.nodes[s]]=i[s];return l},e.prototype.assign=function(i,s){var f=0;this.graph.updateEachNodeAttributes(function(l,u){return u[i]=s[f++],u},{attributes:[i]})},R.NeighborhoodIndex=e,r.prototype.bounds=e.prototype.bounds,r.prototype.project=e.prototype.project,r.prototype.collect=e.prototype.collect,r.prototype.assign=e.prototype.assign,R.WeightedNeighborhoodIndex=r},1063:(j,R,d)=>{var T=d(6714),D=d(3933),c=d(8487),e=D.createUnweightedIndexedBrandes,r=D.createDijkstraIndexedBrandes,i={nodeCentralityAttribute:"betweennessCentrality",getEdgeWeight:"weight",normalized:!0};function s(l,u,w){if(!T(u))throw new Error("graphology-centrality/beetweenness-centrality: the given graph is not a valid graphology instance.");var h,x,a,n,t,o,p,U,Z,I,z=(w=c(w,i)).nodeCentralityAttribute,C=w.normalized,S=w.getEdgeWeight?r(u,w.getEdgeWeight):e(u),y=u.order,E=new Float64Array(y),v=new Float64Array(y);for(o=0;o<y;o++){for(a=(h=S(o))[1],n=h[2],p=(x=h[0]).size;p--;)E[x.items[x.size-p]]=0;for(;0!==x.size;){for(t=(1+E[I=x.pop()])/n[I],p=0,U=a[I].length;p<U;p++)E[Z=a[I][p]]+=n[Z]*t;I!==o&&(v[I]+=E[I])}}var P;if(null!==(P=C?y<=2?null:1/((y-1)*(y-2)):"undirected"===u.type?.5:null))for(o=0;o<y;o++)v[o]*=P;return l?S.index.assign(z,v):S.index.collect(v)}var f=s.bind(null,!1);f.assign=s.bind(null,!0),j.exports=f},3378:(j,R,d)=>{var T=d(6714),D=d(8487),c=d(8740),e=d(4268),r=d(6078).NeighborhoodIndex,i={nodeCentralityAttribute:"closenessCentrality",wassermanFaust:!1};function s(u){this.index=new r(u,"inbound"),this.queue=new c(Array,u.order),this.seen=new e(u.order)}function f(u,w,z){if(!T(w))throw new Error("graphology-metrics/centrality/closeness: the given graph is not a valid graphology instance.");var h,x,a,n,t,C=(z=D(z,i)).wassermanFaust,S=new s(w),y=w.order,o=new Float64Array(y);for(h=0;h<y;h++)a=(x=S.fromNode(h))[0],t=0,(n=x[1])>0&&y>1&&(t=a/n,C&&(t*=a/(y-1))),o[h]=t;return u?S.index.assign(z.nodeCentralityAttribute,o):S.index.collect(o)}s.prototype.fromNode=function(u){var w=this.index,z=this.queue,C=this.seen;C.clear(),z.clear(),C.add(u),z.push([u,0]);for(var S,y,h,x,a,n,t=0,o=0;0!==z.size;)for(0!==(h=(S=z.shift())[1])&&(t+=h,o+=1),a=w.starts[(y=S[0])+1],x=w.starts[y];x<a;x++)!C.has(n=w.neighborhood[x])&&(C.add(n),z.push([n,h+1]));return[o,t]};var l=f.bind(null,!1);l.assign=f.bind(null,!0),j.exports=l},5408:(j,R,d)=>{var T=d(6714);function D(i,s,f,l){var u=s+"Centrality";if(!T(f))throw new Error("graphology-centrality/"+u+": the given graph is not a valid graphology instance.");if("degree"!==s&&"undirected"===f.type)throw new Error("graphology-centrality/"+u+": cannot compute "+s+" centrality on an undirected graph.");var w=(l=l||{}).nodeCentralityAttribute||u,z=f.order-1,C=f[s].bind(f);if(!i){var S={};return f.forEachNode(function(y){S[y]=C(y)/z}),S}f.updateEachNodeAttributes(function(y,h){return h[w]=C(y)/z,h},{attributes:[w]})}var c=D.bind(null,!1,"degree"),e=D.bind(null,!1,"inDegree"),r=D.bind(null,!1,"outDegree");c.assign=D.bind(null,!0,"degree"),e.assign=D.bind(null,!0,"inDegree"),r.assign=D.bind(null,!0,"outDegree"),R.degreeCentrality=c,R.inDegreeCentrality=e,R.outDegreeCentrality=r},5894:(j,R,d)=>{var T=d(6714),D=d(8487),c=d(6078).WeightedNeighborhoodIndex,e={nodeCentralityAttribute:"eigenvectorCentrality",getEdgeWeight:"weight",maxIterations:100,tolerance:1e-6};function r(f){for(var l=0,u=0,w=0,z=f.length;w<z;w++){var C=Math.abs(f[w]);C>l&&(u*=l/C*(l/C),l=C),u+=0===C&&0===l?0:C/l*(C/l)}return l===1/0?1:l*Math.sqrt(u)}function i(f,l,u){if(!T(l))throw new Error("graphology-metrics/centrality/eigenvector: the given graph is not a valid graphology instance.");var y,h,x,w=(u=D(u,e)).maxIterations,z=u.tolerance,C=l.order,S=new c(l,u.getEdgeWeight),n=new Float64Array(l.order);for(y=0;y<C;y++)n[y]=1/C;for(var U,Z,t=0,o=0,I=!1;t<w;){for(U=n,n=new Float64Array(U),y=0;y<C;y++)for(x=S.starts[y+1],h=S.starts[y];h<x;h++)n[S.neighborhood[h]]+=U[y]*S.weights[h];for(Z=r(n),y=0;y<C;y++)n[y]/=Z;for(o=0,y=0;y<C;y++)o+=Math.abs(n[y]-U[y]);if(o<C*z){I=!0;break}t++}if(!I)throw Error("graphology-metrics/centrality/eigenvector: failed to converge.");if(!f)return S.collect(n);S.assign(u.nodeCentralityAttribute,n)}var s=i.bind(null,!1);s.assign=i.bind(null,!0),j.exports=s},9850:(j,R,d)=>{var T=d(8487),D=d(6714),c=d(2954).Q6,e={nodeAuthorityAttribute:"authority",nodeHubAttribute:"hub",getEdgeWeight:"weight",maxIterations:100,normalize:!0,tolerance:1e-8};function r(l,u){var z,C,w=Object.create(null);for(z=0,C=l.length;z<C;z++)w[l[z]]=u;return w}function i(l){var u=0;for(var w in l)u+=l[w];return u}function s(l,u,w){if(!D(u))throw new Error("graphology-hits: the given graph is not a valid graphology instance.");if(u.multi)throw new Error("graphology-hits: the HITS algorithm does not work with MultiGraphs.");w=T(w,e);var y,n,t,o,p,U,Z,I,E,v,P,F,k,H,z=c(w.getEdgeWeight).fromEntry,C=u.order,S=u.nodes(),h=r(S,1/C),x={},a=!1;for(u.forEachEdge(function(B,L,K,et,rt,st,it){x[B]=z(B,L,K,et,rt,st,it)}),Z=0;Z<w.maxIterations;Z++){for(n=h,h=r(S,0),t=r(S,0),E=0,I=0,F=0;F<C;F++)for(k=0,H=(y=u.outboundEdges(o=S[F])).length;k<H;k++)p=u.opposite(o,U=y[k]),t[p]+=n[o]*x[U],t[p]>I&&(I=t[p]);for(F=0;F<C;F++)for(k=0,H=(y=u.outboundEdges(o=S[F])).length;k<H;k++)p=u.opposite(o,U=y[k]),h[o]+=t[p]*x[U],h[p]>E&&(E=h[p]);for(o in P=1/E,h)h[o]*=P;for(o in P=1/I,t)t[o]*=P;for(o in v=0,h)v+=Math.abs(h[o]-n[o]);if(v<w.tolerance){a=!0;break}}if(!a)throw Error("graphology-metrics/centrality/hits: failed to converge.");if(w.normalize){for(o in P=1/i(t),t)t[o]*=P;for(o in P=1/i(h),h)h[o]*=P}if(!l)return{hubs:h,authorities:t};u.updateEachNodeAttributes(function(B,L){return L[w.nodeAuthorityAttribute]=t[B],L[w.nodeHubAttribute]=h[B],L},{attributes:[w.nodeAuthorityAttribute,w.nodeHubAttribute]})}var f=s.bind(null,!1);f.assign=s.bind(null,!0),j.exports=f},5547:(j,R,d)=>{d(5408);d(1063),d(3378),d(5894),d(9850),R.pagerank=d(593)},593:(j,R,d)=>{var T=d(6714),D=d(8487),c=d(6078).WeightedNeighborhoodIndex,e={nodePagerankAttribute:"pagerank",getEdgeWeight:"weight",alpha:.85,maxIterations:100,tolerance:1e-6};function r(s,f,l){if(!T(f))throw new Error("graphology-metrics/centrality/pagerank: the given graph is not a valid graphology instance.");var x,a,n,t,u=(l=D(l,e)).alpha,w=l.maxIterations,z=l.tolerance,C=l.nodePagerankAttribute,S=f.order,y=1/S,h=new c(f,l.getEdgeWeight),o=new Float64Array(f.order),p=new Float64Array(h.weights.length),U=[];for(x=0;x<S;x++)for(o[x]=y,n=h.starts[x+1],0===(t=h.outDegrees[x])&&U.push(x),a=h.starts[x];a<n;a++)p[a]=h.weights[a]/t;for(var E,P,Z=0,I=0,F=!1;Z<w;){for(P=o,o=new Float64Array(f.order),E=0,x=0,n=U.length;x<n;x++)E+=P[U[x]];for(E*=u,x=0;x<S;x++){for(n=h.starts[x+1],a=h.starts[x];a<n;a++)o[h.neighborhood[a]]+=u*P[x]*p[a];o[x]+=E*y+(1-u)*y}for(I=0,x=0;x<S;x++)I+=Math.abs(o[x]-P[x]);if(I<S*z){F=!0;break}Z++}if(!F)throw Error("graphology-metrics/centrality/pagerank: failed to converge.");if(!s)return h.collect(o);h.assign(C,o)}var i=r.bind(null,!1);i.assign=r.bind(null,!0),j.exports=i},3933:(j,R,d)=>{var T=d(8740),D=d(7451),c=d(4547),e=d(6116),r=d(6078),i=r.NeighborhoodIndex,s=r.WeightedNeighborhoodIndex;function f(l,u){return l[0]>u[0]?1:l[0]<u[0]?-1:l[1]>u[1]?1:l[1]<u[1]?-1:l[2]>u[2]?1:l[2]<u[2]?-1:l[3]>u[3]?1:l[3]<u[3]?-1:0}R.createUnweightedIndexedBrandes=function(u){var w=new i(u),z=w.neighborhood,C=w.starts,S=u.order,y=new D(e.getPointerArray(S),S),h=new Uint32Array(S),x=new Array(S),a=new Int32Array(S),n=new T(Uint32Array,S),t=function(o){var p,U,I,E,v,P;for(v=0;v<S;v++)x[v]=[],h[v]=0,a[v]=-1;for(h[o]=1,a[o]=0,n.push(o);0!==n.size;)for(v=n.shift(),y.push(v),p=a[v],U=h[v],I=C[v+1],E=C[v];E<I;E++)-1===a[P=z[E]]&&(n.push(P),a[P]=p+1),a[P]===p+1&&(h[P]+=U,x[P].push(v));return[y,x,h]};return t.index=w,t},R.createDijkstraIndexedBrandes=function(u,w){var z=new s(u,w||"weight"),C=z.neighborhood,S=z.weights,y=z.starts,h=u.order,x=new D(e.getPointerArray(h),h),a=new Uint32Array(h),n=new Array(h),t=new Float64Array(h),o=new Float64Array(h),p=new c(f),U=function(Z){var E,v,P,F,k,H,B,L,K=0;for(B=0;B<h;B++)n[B]=[],a[B]=0,t[B]=-1,o[B]=-1;for(a[Z]=1,o[Z]=0,p.push([0,K++,Z,Z]);0!==p.size;)if(P=(v=p.pop())[0],F=v[2],-1===t[B=v[3]])for(x.push(B),t[B]=P,a[B]+=a[F],E=y[B+1],H=y[B];H<E;H++)k=P+S[H],-1===t[L=C[H]]&&(-1===o[L]||k<o[L])?(o[L]=k,p.push([k,K++,B,L]),a[L]=0,n[L]=[B]):k===o[L]&&(a[L]+=a[B],n[L].push(B));return[x,n,a]};return U.index=z,U}},8740:(j,R,d)=>{var T=d(6009),D=d(5701);function c(e,r){if(arguments.length<2)throw new Error("mnemonist/fixed-deque: expecting an Array class and a capacity.");if("number"!=typeof r||r<=0)throw new Error("mnemonist/fixed-deque: `capacity` should be a positive number.");this.ArrayClass=e,this.capacity=r,this.items=new e(this.capacity),this.clear()}c.prototype.clear=function(){this.start=0,this.size=0},c.prototype.push=function(e){if(this.size===this.capacity)throw new Error("mnemonist/fixed-deque.push: deque capacity ("+this.capacity+") exceeded!");return this.items[(this.start+this.size)%this.capacity]=e,++this.size},c.prototype.unshift=function(e){if(this.size===this.capacity)throw new Error("mnemonist/fixed-deque.unshift: deque capacity ("+this.capacity+") exceeded!");var r=this.start-1;return 0===this.start&&(r=this.capacity-1),this.items[r]=e,this.start=r,++this.size},c.prototype.pop=function(){if(0===this.size)return;const e=(this.start+this.size-1)%this.capacity;return this.size--,this.items[e]},c.prototype.shift=function(){if(0!==this.size){var e=this.start;return this.size--,this.start++,this.start===this.capacity&&(this.start=0),this.items[e]}},c.prototype.peekFirst=function(){if(0!==this.size)return this.items[this.start]},c.prototype.peekLast=function(){if(0!==this.size){var e=this.start+this.size-1;return e>this.capacity&&(e-=this.capacity),this.items[e]}},c.prototype.get=function(e){if(0!==this.size)return(e=this.start+e)>this.capacity&&(e-=this.capacity),this.items[e]},c.prototype.forEach=function(e,r){r=arguments.length>1?r:this;for(var i=this.capacity,s=this.size,f=this.start,l=0;l<s;)e.call(r,this.items[f],l,this),l++,++f===i&&(f=0)},c.prototype.toArray=function(){var e=this.start+this.size;if(e<this.capacity)return this.items.slice(this.start,e);for(var r=new this.ArrayClass(this.size),i=this.capacity,s=this.size,f=this.start,l=0;l<s;)r[l]=this.items[f],l++,++f===i&&(f=0);return r},c.prototype.values=function(){var e=this.items,r=this.capacity,i=this.size,s=this.start,f=0;return new D(function(){if(f>=i)return{done:!0};var l=e[s];return s++,f++,s===r&&(s=0),{value:l,done:!1}})},c.prototype.entries=function(){var e=this.items,r=this.capacity,i=this.size,s=this.start,f=0;return new D(function(){if(f>=i)return{done:!0};var l=e[s];return++s===r&&(s=0),{value:[f++,l],done:!1}})},"undefined"!=typeof Symbol&&(c.prototype[Symbol.iterator]=c.prototype.values),c.prototype.inspect=function(){var e=this.toArray();return e.type=this.ArrayClass.name,e.capacity=this.capacity,Object.defineProperty(e,"constructor",{value:c,enumerable:!1}),e},"undefined"!=typeof Symbol&&(c.prototype[Symbol.for("nodejs.util.inspect.custom")]=c.prototype.inspect),c.from=function(e,r,i){if(arguments.length<3&&"number"!=typeof(i=T.guessLength(e)))throw new Error("mnemonist/fixed-deque.from: could not guess iterable length. Please provide desired capacity as last argument.");var s=new c(r,i);if(T.isArrayLike(e)){var f,l;for(f=0,l=e.length;f<l;f++)s.items[f]=e[f];return s.size=l,s}return T.forEach(e,function(u){s.push(u)}),s},j.exports=c},7451:(j,R,d)=>{var T=d(5701),D=d(6009);function c(e,r){if(arguments.length<2)throw new Error("mnemonist/fixed-stack: expecting an Array class and a capacity.");if("number"!=typeof r||r<=0)throw new Error("mnemonist/fixed-stack: `capacity` should be a positive number.");this.capacity=r,this.ArrayClass=e,this.items=new this.ArrayClass(this.capacity),this.clear()}c.prototype.clear=function(){this.size=0},c.prototype.push=function(e){if(this.size===this.capacity)throw new Error("mnemonist/fixed-stack.push: stack capacity ("+this.capacity+") exceeded!");return this.items[this.size++]=e,this.size},c.prototype.pop=function(){if(0!==this.size)return this.items[--this.size]},c.prototype.peek=function(){return this.items[this.size-1]},c.prototype.forEach=function(e,r){r=arguments.length>1?r:this;for(var i=0,s=this.items.length;i<s;i++)e.call(r,this.items[s-i-1],i,this)},c.prototype.toArray=function(){for(var e=new this.ArrayClass(this.size),r=this.size-1,i=this.size;i--;)e[i]=this.items[r-i];return e},c.prototype.values=function(){var e=this.items,r=this.size,i=0;return new T(function(){if(i>=r)return{done:!0};var s=e[r-i-1];return i++,{value:s,done:!1}})},c.prototype.entries=function(){var e=this.items,r=this.size,i=0;return new T(function(){if(i>=r)return{done:!0};var s=e[r-i-1];return{value:[i++,s],done:!1}})},"undefined"!=typeof Symbol&&(c.prototype[Symbol.iterator]=c.prototype.values),c.prototype.toString=function(){return this.toArray().join(",")},c.prototype.toJSON=function(){return this.toArray()},c.prototype.inspect=function(){var e=this.toArray();return e.type=this.ArrayClass.name,e.capacity=this.capacity,Object.defineProperty(e,"constructor",{value:c,enumerable:!1}),e},"undefined"!=typeof Symbol&&(c.prototype[Symbol.for("nodejs.util.inspect.custom")]=c.prototype.inspect),c.from=function(e,r,i){if(arguments.length<3&&"number"!=typeof(i=D.guessLength(e)))throw new Error("mnemonist/fixed-stack.from: could not guess iterable length. Please provide desired capacity as last argument.");var s=new c(r,i);if(D.isArrayLike(e)){var f,l;for(f=0,l=e.length;f<l;f++)s.items[f]=e[f];return s.size=l,s}return D.forEach(e,function(u){s.push(u)}),s},j.exports=c},4547:(j,R,d)=>{var T=d(4467),D=d(2062),c=d(6009),e=D.DEFAULT_COMPARATOR,r=D.reverseComparator;function i(a,n,t,o){for(var U,Z,p=n[o];o>t&&a(p,Z=n[U=o-1>>1])<0;)n[o]=Z,o=U;n[o]=p}function s(a,n,t){for(var I,o=n.length,p=t,U=n[t],Z=2*t+1;Z<o;)(I=Z+1)<o&&a(n[Z],n[I])>=0&&(Z=I),n[t]=n[Z],Z=2*(t=Z)+1;n[t]=U,i(a,n,p,t)}function f(a,n,t){n.push(t),i(a,n,0,n.length-1)}function l(a,n){var t=n.pop();if(0!==n.length){var o=n[0];return n[0]=t,s(a,n,0),o}return t}function u(a,n,t){if(0===n.length)throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");var o=n[0];return n[0]=t,s(a,n,0),o}function w(a,n,t){var o;return 0!==n.length&&a(n[0],t)<0&&(o=n[0],n[0]=t,t=o,s(a,n,0)),t}function z(a,n){for(var p=n.length>>1;--p>=0;)s(a,n,p)}function C(a,n){for(var t=n.length,o=0,p=new Array(t);o<t;)p[o++]=l(a,n);return p}function h(a){if(this.clear(),this.comparator=a||e,"function"!=typeof this.comparator)throw new Error("mnemonist/Heap.constructor: given comparator should be a function.")}function x(a){if(this.clear(),this.comparator=a||e,"function"!=typeof this.comparator)throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");this.comparator=r(this.comparator)}h.prototype.clear=function(){this.items=[],this.size=0},h.prototype.push=function(a){return f(this.comparator,this.items,a),++this.size},h.prototype.peek=function(){return this.items[0]},h.prototype.pop=function(){return 0!==this.size&&this.size--,l(this.comparator,this.items)},h.prototype.replace=function(a){return u(this.comparator,this.items,a)},h.prototype.pushpop=function(a){return w(this.comparator,this.items,a)},h.prototype.consume=function(){return this.size=0,C(this.comparator,this.items)},h.prototype.toArray=function(){return C(this.comparator,this.items.slice())},h.prototype.inspect=function(){var a=this.toArray();return Object.defineProperty(a,"constructor",{value:h,enumerable:!1}),a},"undefined"!=typeof Symbol&&(h.prototype[Symbol.for("nodejs.util.inspect.custom")]=h.prototype.inspect),x.prototype=h.prototype,h.from=function(a,n){var o,t=new h(n);return o=c.isArrayLike(a)?a.slice():c.toArray(a),z(t.comparator,o),t.items=o,t.size=o.length,t},x.from=function(a,n){var o,t=new x(n);return o=c.isArrayLike(a)?a.slice():c.toArray(a),z(t.comparator,o),t.items=o,t.size=o.length,t},h.siftUp=s,h.siftDown=i,h.push=f,h.pop=l,h.replace=u,h.pushpop=w,h.heapify=z,h.consume=C,h.nsmallest=function S(a,n,t){2===arguments.length&&(t=n,n=a,a=e);var p,U,Z,E,o=r(a),I=1/0;if(1===n){if(c.isArrayLike(t)){for(p=0,U=t.length;p<U;p++)Z=t[p],(I===1/0||a(Z,I)<0)&&(I=Z);return(E=new t.constructor(1))[0]=I,E}return T(t,function(P){(I===1/0||a(P,I)<0)&&(I=P)}),[I]}if(c.isArrayLike(t)){if(n>=t.length)return t.slice().sort(a);for(E=t.slice(0,n),z(o,E),p=n,U=t.length;p<U;p++)o(t[p],E[0])>0&&u(o,E,t[p]);return E.sort(a)}var v=c.guessLength(t);return null!==v&&v<n&&(n=v),E=new Array(n),p=0,T(t,function(P){p<n?E[p]=P:(p===n&&z(o,E),o(P,E[0])>0&&u(o,E,P)),p++}),E.length>p&&(E.length=p),E.sort(a)},h.nlargest=function y(a,n,t){2===arguments.length&&(t=n,n=a,a=e);var p,U,Z,E,o=r(a),I=-1/0;if(1===n){if(c.isArrayLike(t)){for(p=0,U=t.length;p<U;p++)Z=t[p],(I===-1/0||a(Z,I)>0)&&(I=Z);return(E=new t.constructor(1))[0]=I,E}return T(t,function(P){(I===-1/0||a(P,I)>0)&&(I=P)}),[I]}if(c.isArrayLike(t)){if(n>=t.length)return t.slice().sort(o);for(E=t.slice(0,n),z(a,E),p=n,U=t.length;p<U;p++)a(t[p],E[0])>0&&u(a,E,t[p]);return E.sort(o)}var v=c.guessLength(t);return null!==v&&v<n&&(n=v),E=new Array(n),p=0,T(t,function(P){p<n?E[p]=P:(p===n&&z(a,E),a(P,E[0])>0&&u(a,E,P)),p++}),E.length>p&&(E.length=p),E.sort(o)},h.MinHeap=h,h.MaxHeap=x,j.exports=h},4268:(j,R,d)=>{var T=d(5701),D=d(6116).getPointerArray;function c(e){var r=D(e);this.size=0,this.length=e,this.dense=new r(e),this.sparse=new r(e)}c.prototype.clear=function(){this.size=0},c.prototype.has=function(e){var r=this.sparse[e];return r<this.size&&this.dense[r]===e},c.prototype.add=function(e){var r=this.sparse[e];return r<this.size&&this.dense[r]===e||(this.dense[this.size]=e,this.sparse[e]=this.size,this.size++),this},c.prototype.delete=function(e){var r=this.sparse[e];return!(r>=this.size||this.dense[r]!==e||(this.dense[this.sparse[e]]=r=this.dense[this.size-1],this.sparse[r]=this.sparse[e],this.size--,0))},c.prototype.forEach=function(e,r){r=arguments.length>1?r:this;for(var i,s=0;s<this.size;s++)e.call(r,i=this.dense[s],i)},c.prototype.values=function(){var e=this.size,r=this.dense,i=0;return new T(function(){if(i<e){var s=r[i];return i++,{value:s}}return{done:!0}})},"undefined"!=typeof Symbol&&(c.prototype[Symbol.iterator]=c.prototype.values),c.prototype.inspect=function(){for(var e=new Set,r=0;r<this.size;r++)e.add(this.dense[r]);return Object.defineProperty(e,"constructor",{value:c,enumerable:!1}),e.length=this.length,e},"undefined"!=typeof Symbol&&(c.prototype[Symbol.for("nodejs.util.inspect.custom")]=c.prototype.inspect),j.exports=c},2062:(j,R)=>{R.DEFAULT_COMPARATOR=function(e,r){return e<r?-1:e>r?1:0},R.DEFAULT_REVERSE_COMPARATOR=function(e,r){return e<r?1:e>r?-1:0},R.reverseComparator=function D(e){return function(r,i){return e(i,r)}},R.createTupleComparator=function c(e){return 2===e?function(r,i){return r[0]<i[0]?-1:r[0]>i[0]?1:r[1]<i[1]?-1:r[1]>i[1]?1:0}:function(r,i){for(var s=0;s<e;){if(r[s]<i[s])return-1;if(r[s]>i[s])return 1;s++}return 0}}},6009:(j,R,d)=>{var T=d(4467),D=d(6116);function e(s){return"number"==typeof s.length?s.length:"number"==typeof s.size?s.size:void 0}R.isArrayLike=function c(s){return Array.isArray(s)||D.isTypedArray(s)},R.guessLength=e,R.toArray=function r(s){var f=e(s),l="number"==typeof f?new Array(f):[],u=0;return T(s,function(w){l[u++]=w}),l},R.toArrayWithIndices=function i(s){var f=e(s),l="number"==typeof f?D.getPointerArray(f):Array,u="number"==typeof f?new Array(f):[],w="number"==typeof f?new l(f):[],z=0;return T(s,function(C){u[z]=C,w[z]=z++}),[u,w]}},4467:(j,R,d)=>{var T=d(8123),D=T.ARRAY_BUFFER_SUPPORT,c=T.SYMBOL_SUPPORT;j.exports=function(r,i){var s,f,l,u,w;if(!r)throw new Error("obliterator/forEach: invalid iterable.");if("function"!=typeof i)throw new Error("obliterator/forEach: expecting a callback.");if(Array.isArray(r)||D&&ArrayBuffer.isView(r)||"string"==typeof r||"[object Arguments]"===r.toString())for(l=0,u=r.length;l<u;l++)i(r[l],l);else if("function"!=typeof r.forEach)if(c&&Symbol.iterator in r&&"function"!=typeof r.next&&(r=r[Symbol.iterator]()),"function"!=typeof r.next)for(f in r)r.hasOwnProperty(f)&&i(r[f],f);else for(s=r,l=0;!0!==(w=s.next()).done;)i(w.value,l),l++;else r.forEach(i)}},8123:(j,R)=>{R.ARRAY_BUFFER_SUPPORT="undefined"!=typeof ArrayBuffer,R.SYMBOL_SUPPORT="undefined"!=typeof Symbol}}]);