'use strict';
(function(root){
 function metricsFor(id,d){const s=d.summary||{},reports=d.reports||{},rows=reports[id]||[],sum=rows.reduce((v,r)=>v+(Number(r.value)||0),0),peak=rows.reduce((a,b)=>(Number(b.value)||0)>(Number(a.value)||0)?b:a,{label:'—',value:0});const count=(label,value,icon='✦')=>({label,value:Number(value)||0,type:'number',icon}),cash=(label,value,icon='₹')=>({label,value:Number(value)||0,type:'currency',icon}),text=(label,value,icon='🏆')=>({label,value:value||'—',type:'text',icon}),percent=(label,value)=>({label,value:Number(value)||0,type:'percent',icon:'↗'});
 switch(id){
 case 'leadVolume':return[count('Total leads',s.totalLeads,'👥'),count('Days with leads',rows.length,'📅'),count('Peak daily leads',peak.value,'📈'),text('Peak lead date',peak.label,'🗓')];
 case 'paidUnpaid':return[count('Paid lead records',s.paidOrders,'✅'),count('Unpaid leads',s.unpaid,'⌛'),percent('Recorded lead conversion',s.conversion)];
 case 'topProducts':return[text('Top product',peak.label),cash('Top product revenue',peak.value),count('Products in top list',rows.length,'📦')];
 case 'leadsByProduct':return[text('Most requested selection',peak.label,'📦'),count('Leads for that selection',peak.value,'👥'),count('Selections represented',rows.length,'🗂')];
 case 'conversion':return[percent('Recorded lead conversion',s.conversion),count('Paid lead records',s.paidOrders,'✅'),count('Total leads',s.totalLeads,'👥')];
 case 'uniqueUsers':return[count('Unique lead contacts',s.uniqueCustomers,'👤'),count('Unique verified paid buyers',s.uniquePaidBuyers,'🛍'),count('Total leads',s.totalLeads,'👥'),count('Repeat lead records',Math.max(0,(s.totalLeads||0)-(s.uniqueCustomers||0)),'🔁')];
 case 'abandoned':return[count('Abandoned leads',rows.length,'🛒'),count('All unpaid leads',s.unpaid,'⌛'),text('Oldest abandoned date',rows.map(x=>x.date).filter(Boolean).sort()[0],'📅')];
 case 'topCustomers':return[text('Top paying customer',peak.label),cash('Top customer revenue',peak.value),cash('Revenue of listed customers',sum)];
 case 'topPayments':return[cash('Largest payment',peak.value),count('Payments in top list',rows.length,'💳'),cash('Value of listed payments',sum)];
 case 'monthlyRevenue':return[cash('Current month in date range',s.monthRevenue,'🗓'),cash('Peak month revenue',peak.value),count('Months with revenue',rows.length,'📅')];
 case 'dailyRevenue':case 'revenueOverTime':case 'totalRevenue':return[cash('Revenue in date range',s.revenue),cash('Peak daily revenue',peak.value,'📈'),cash('Average paid order',s.averageOrder),count('Paid lead records',s.paidOrders,'✅')];
 default:return[count('Total leads',s.totalLeads,'👥'),count('Paid lead records',s.paidOrders,'✅'),cash('Total revenue',s.revenue),percent('Recorded lead conversion',s.conversion),count('Unique lead customers',s.uniqueCustomers,'👤'),cash('Current month in date range',s.monthRevenue,'🗓'),count('Unpaid leads',s.unpaid,'⌛'),count('Abandoned leads',(reports.abandoned||[]).length,'🛒'),cash('Revenue today in range',s.revenueToday,'📈'),cash('Average paid order',s.averageOrder,'💳'),count('Total newsletter contacts',s.newsletter,'✉'),count('Orders needing delivery',s.pendingDelivery,'📨')];
 }}
 const api={metricsFor};if(typeof module==='object'&&module.exports)module.exports=api;else root.RSReportMetrics=api;
})(typeof window!=='undefined'?window:globalThis);
