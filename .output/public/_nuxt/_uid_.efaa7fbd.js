import{u as c,a as i,r as n,w as l,b as _,c as u,f as m,t as p,e as d,o as h}from"./entry.2a97c8f1.js";import{P as f}from"./prism-pug.95730773.js";import"./_commonjsHelpers.042e6b4d.js";const g={class:"e-hvh e-wvw e-flex-col"},w={methods:{scrollDown(a){}},mounted(){f.highlightAll()}},A=Object.assign(w,{__name:"[uid]",async setup(a){let e,t;const{client:o}=c(),r=i();n();const{data:s}=([e,t]=l(()=>o.getByUID("page",r.params.uid)),e=await e,t(),e);return _({title:s.meta_title+" | VWLab",bodyAttrs:{class:"page"}}),(y,b)=>(h(),u("div",g,[m("h1",null," This is course: "+p(d(s).title),1)]))}});export{A as default};