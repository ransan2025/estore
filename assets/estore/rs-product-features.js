/* Heading-based promotion groups; no spreadsheet column offsets. */
(function(root,factory){const value=factory();if(typeof module==='object'&&module.exports)module.exports=value;else root.RSProductFeatures=value;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const norm=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
 function typeFor(heading){const key=norm(heading);if(key.includes('combo'))return 'combo';if(key.startsWith('flash')||key==='tickertext'||key==='urgency')return 'flash';if(key.startsWith('justdropped')||key.startsWith('jd')||key==='launchdate'||key==='newbadgedays')return 'jd';if(key.startsWith('dealsoftheday')||key.startsWith('dotd')||key==='dealexpiresat')return 'deals';return 'general';}
 const options=[['general','Product details'],['deals','Deals of the day'],['flash','Flash message'],['jd','Just Dropped'],['combo','Combo offers'],['all','All fields']];
 function visible(heading,selected){const type=typeFor(heading);return selected==='all'||(selected==='general'?type==='general':type===selected||(selected==='flash'&&norm(heading)==='productname'));}
 function nextSlide(index,direction,max){if(max<=0)return {index:0,direction:1};let next=index+direction;if(next>max){direction=-1;next=max-1;}else if(next<0){direction=1;next=1;}return {index:Math.max(0,Math.min(max,next)),direction:direction};}
 function columns(count,wide){return wide&&count>2?2:1;}
 return {typeFor,visible,options,nextSlide,columns};
});
