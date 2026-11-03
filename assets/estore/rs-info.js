'use strict';
(()=>{
 const root=document.documentElement;try{root.dataset.theme=localStorage.getItem('ransan-theme')||'light';}catch(ignore){}
 const theme=document.querySelector('.rs-info-theme18'),menu=document.querySelector('.rs-info-menu18'),nav=document.querySelector('#info-navigation');
 const sync=()=>{if(theme){theme.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));theme.setAttribute('aria-label',root.dataset.theme==='dark'?'Use light theme':'Use dark theme');}};sync();
 theme?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('ransan-theme',root.dataset.theme);}catch(ignore){}sync();});
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.dataset.open=String(open);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.dataset.open='false';menu.focus();}});
 const toc=document.querySelector('#info-contents');document.querySelectorAll('.rs-info-page article h2').forEach((heading,i)=>{heading.id=heading.id||'section-'+(i+1);if(toc){const link=document.createElement('a');link.href='#'+heading.id;link.textContent=heading.textContent;toc.append(link);}});
 const path=location.pathname.split('/').pop();document.querySelectorAll('#info-navigation a').forEach(a=>{if(a.getAttribute('href')===path)a.setAttribute('aria-current','page');});
 const explicit=new URLSearchParams(location.search).get('env'),env=['test','live'].includes(explicit)?explicit:window.RS_CONFIG?.env;if(!['test','live'].includes(env))return;
 document.querySelectorAll('a[href]').forEach(a=>{const url=new URL(a.href,location.href);if(url.origin===location.origin&&/\.html$/.test(url.pathname)){url.searchParams.set('env',env);a.href=url.href;}});
})();
