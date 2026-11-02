/* Environment resolution is local to this page. It never rewrites public config. */
(function(root){
 'use strict';
 function resolve(base,options={}){
  if(!base||!['test','live'].includes(base.env))throw new Error('Invalid RanSan default environment.');
  const query=new URLSearchParams(options.search||''),explicit=query.get('env');
  if(query.has('env')&&!['test','live'].includes(explicit))throw new Error('Use env=test or env=live.');
  const env=explicit||(options.admin&&['test','live'].includes(options.stored)?options.stored:base.env);
  return Object.freeze({...base,env,defaultStoreEnv:base.env});
 }
 const api={resolve};if(typeof module==='object'&&module.exports)module.exports=api;else root.RSEnvironment=api;
})(typeof window!=='undefined'?window:globalThis);
