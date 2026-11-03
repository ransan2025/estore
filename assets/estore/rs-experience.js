(function(root){'use strict';
 function sortProducts(rows,mode){return rows.map((p,i)=>({p,i})).sort((a,b)=>{let value=mode==='price-low'?a.p.pricePaise-b.p.pricePaise:mode==='price-high'?b.p.pricePaise-a.p.pricePaise:mode==='rating'?(b.p.rating||0)-(a.p.rating||0):mode==='newest'?(Date.parse(b.p.launchDate)||0)-(Date.parse(a.p.launchDate)||0):0;return value||a.i-b.i;}).map(x=>x.p);}
 function isNew(p,now=Date.now()){if(!p.newName)return false;if(!p.launchDate)return true;const launch=Date.parse(p.launchDate);return Number.isFinite(launch)&&now>=launch&&now<launch+(p.newBadgeDays||30)*86400000;}
 function dealActive(p,now=Date.now()){return p.dealPricePaise!==null&&(!p.dealExpiresAt||Date.parse(p.dealExpiresAt)>now);}
 function overlaps(product,existing){const ids=new Set((product.items||[{productId:product.id}]).map(x=>x.productId));return existing.filter(p=>(p.items||[{productId:p.id}]).some(i=>ids.has(i.productId)));}
 function revenueGroups(rows,period){const map={};for(const r of rows){let key=r.label;if(period==='week'){const day=new Date(r.label+'T00:00:00Z');day.setUTCDate(day.getUTCDate()-((day.getUTCDay()+6)%7));key=day.toISOString().slice(0,10);}else if(period==='month')key=key.slice(0,7);else if(period==='year')key=key.slice(0,4);map[key]=(map[key]||0)+Number(r.value||0);}return Object.keys(map).sort().map(label=>({label,value:map[label]}));}
 const api={sortProducts,isNew,dealActive,overlaps,revenueGroups};if(typeof module==='object'&&module.exports)module.exports=api;else root.RSExperience=api;
})(typeof window!=='undefined'?window:globalThis);
