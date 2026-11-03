'use strict';
/* Shared pure text normalization. No remote HTML is inserted into the page. */
(function(root){
 function descriptionLines(value){
  let text=String(value||'').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi,'');
  text=text.replace(/\\+r\\+n|\\+n|\\+r/g,'\n').replace(/\r\n?/g,'\n').replace(/<br\s*\/?\s*>/gi,'\n').replace(/<(?:p|div|h[1-6])\b[^>]*>/gi,'\n\n').replace(/<\/(?:p|div|h[1-6]|ul|ol)>/gi,'\n\n').replace(/<li\b[^>]*>/gi,'\n• ').replace(/<\/li>/gi,'\n').replace(/<\/?[a-z][^>]*>/gi,'');
  const entities={nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};text=text.replace(/&(#x[0-9a-f]+|#\d+|nbsp|amp|lt|gt|quot|apos);/gi,(all,key)=>{if(key[0]!=='#')return entities[key.toLowerCase()]??all;const hex=key[1].toLowerCase()==='x',n=parseInt(key.slice(hex?2:1),hex?16:10);return Number.isFinite(n)&&n>0&&n<=0x10ffff?String.fromCodePoint(n):all;});
  text=text.replace(/[ \t]*(?=(?:✅|☑️?|✔️?|🔹|🔸|•|🔷)(?:\s|[A-Za-z]))/gu,'\n').replace(/[ \t]+(?=(?:Key Features|Benefits|What's Included|What’s Included|How It Works)\s*:)/gi,'\n\n');
  return text.split('\n').map(x=>x.trim()).filter(Boolean);
 }
 function timerState(now,start,end){const finish=new Date(end).getTime(),begin=new Date(start).getTime();if(!Number.isFinite(finish))return {state:'unconfigured',tone:'slate',remaining:0};if(finish<=now)return {state:'ended',tone:'slate',remaining:0};const upcoming=Number.isFinite(begin)&&begin>now,target=upcoming?begin:finish,left=target-now,tone=upcoming?'blue':left>72*3600000?'green':left>24*3600000?'amber':left>3600000?'orange':'red';return {state:upcoming?'upcoming':'active',tone,remaining:left};}
 const api={descriptionLines,timerState};if(typeof module==='object'&&module.exports)module.exports=api;else root.RSFormat=api;
})(typeof window!=='undefined'?window:globalThis);
