import{o as s,c as t,t as a,g as i,f as o,F as u,h as m,n as h,i as v,j as g,k as f,P as k,_ as y,l as b}from"./entry.2a97c8f1.js";const C=["data-id","id"],w={key:0},V={class:"slice-docitem__texts"},$={class:"slice-docitem__texts__list"},z=["id"],B={key:0,class:"slice-docitem__texts__each__title"},S={key:1,class:"slice-docitem__video lazyvideo",muted:"",controls:"",height:"fit-content"},T=["src"],A={key:0,class:"slice-docitem__code__path"},D={class:"slice-docitem__code__copy__svg"},H={width:"100%",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 460 460",style:{"enable-background":"new 0 0 460 460"},"xml:space":"preserve"},I=o("path",{d:"M425.93 0H171.66a32.9 32.9 0 0 0-32.86 32.86V110h30V32.86a2.87 2.87 0 0 1 2.86-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86H351.2v30h74.73a32.9 32.9 0 0 0 32.87-32.86V32.86A32.9 32.9 0 0 0 425.93 0z"},null,-1),L=o("path",{d:"M288.34 140H34.07A32.9 32.9 0 0 0 1.2 172.86v254.27A32.9 32.9 0 0 0 34.07 460h254.27a32.9 32.9 0 0 0 32.87-32.86V172.86A32.9 32.9 0 0 0 288.33 140zm0 290H34.07a2.87 2.87 0 0 1-2.87-2.86V172.86a2.87 2.87 0 0 1 2.87-2.86h254.27a2.87 2.87 0 0 1 2.87 2.86v254.28a2.87 2.87 0 0 1-2.87 2.86z"},null,-1),N=[I,L];function F(d,l,c,_,x,n){const r=k;return s(),t("div",{class:"slice-docitem","data-id":c.slice.primary.identifier,id:c.slice.primary.identifier},[c.slice.primary.section_title?(s(),t("h1",w,a(c.slice.primary.section_title),1)):i("",!0),o("div",V,[o("ul",$,[(s(!0),t(u,null,m(c.slice.items,e=>(s(),t("li",{class:h(["sub-item",[e.is_anchor?`sub-item ${e.class}`:e.class]]),id:e.class},[e.title?(s(),t("h1",B,a(e.title),1)):i("",!0),e.video.url?(s(),t("video",S,[o("source",{src:e.video.url,type:"video/mp4"},null,8,T)])):i("",!0),e.rich.length>0?(s(),v(r,{key:2,class:"rich-t subt-title slice-docitem__parag",field:e.rich},{default:g(()=>[f(a(e.rich),1)]),_:2},1032,["field"])):i("",!0),e.code?(s(),t("div",{key:3,class:h(["slice-docitem__code",[e.path?"has-path":null]])},[e.path?(s(),t("div",A,a(e.path),1)):i("",!0),o("pre",null,[o("code",{class:h(["code",`language-${e.code_lang}`])},a(e.code),3)]),o("div",{class:"slice-docitem__code__copy e-flex",onClick:l[0]||(l[0]=(...p)=>n.copyClipboard&&n.copyClipboard(...p))},[o("div",D,[(s(),t("svg",H,N))])])],2)):i("",!0)],10,z))),256))])])],8,C)}const M={name:"slice-docitem",props:["slice"],methods:{copyClipboard(d){const l=d.target.closest(".slice-docitem__code__copy"),c=d.target.closest(".slice-docitem__code").querySelector(".code");l.classList.add("is-copied"),navigator.clipboard.writeText(c.textContent);const _=setTimeout(()=>{l.classList.remove("is-copied"),clearTimeout(_)},1500)}},mounted(){}},P=y(M,[["render",F]]),j={class:"slices"};function q(d,l,c,_,x,n){const r=b("SliceDocItem");return s(),t("main",j,[(s(!0),t(u,null,m(c.slices,(e,p)=>(s(),t(u,null,[e.slice_type==="doc_item"?(s(),v(r,{key:0,slice:e},null,8,["slice"])):i("",!0)],64))),256))])}const E={props:["slices"],name:"slice-blocks",components:{SliceDocItem:P},mounted(){}},G=y(E,[["render",q]]);export{G as _};
