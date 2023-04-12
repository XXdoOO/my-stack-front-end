import{d as b,a2 as S,b as E,k as ue,w as M,Z as $,a3 as $e,a4 as We,i as w,a5 as Ee,a6 as F,a7 as je,a8 as p,c as z,n as H,l as ge,a9 as Te,aa as q,ab as A,ac as ne,ad as ee,ae as pe,af as qe,ag as Ge,ah as be,ai as te,aj as se,ak as le,r as T,al as Ze,am as Ue,E as ye,Y as oe,an as he,o as Me,ao as Be,ap as C,aq as U,ar as Ce,as as Pe,g as Ye,T as Je,F as xe,at as Ie,au as we,av as _e,aw as Ke,ax as Qe,ay as Xe,az as et,aA as tt,aB as nt,aC as ot,aD as at,p as Ae,e as D,y as st,t as lt,u as Se,f as g,aE as ut,aF as rt,aG as it,aH as ct,_ as dt,z as pt,A as mt,B as ft}from"./index.279ccd99.js";const vt=b({name:"ElCollapseTransition"}),ht=b({...vt,setup(e){const o=S("collapse-transition"),n={beforeEnter(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0},enter(t){t.dataset.oldOverflow=t.style.overflow,t.scrollHeight!==0?(t.style.maxHeight=`${t.scrollHeight}px`,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.maxHeight=0,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow},beforeLeave(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.maxHeight=`${t.scrollHeight}px`,t.style.overflow="hidden"},leave(t){t.scrollHeight!==0&&(t.style.maxHeight=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave(t){t.style.maxHeight="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};return(t,a)=>(E(),ue(Ee,$e({name:w(o).b()},We(n)),{default:M(()=>[$(t.$slots,"default")]),_:3},16,["name"]))}});var ae=F(ht,[["__file","/home/runner/work/element-plus/element-plus/packages/components/collapse-transition/src/collapse-transition.vue"]]);ae.install=e=>{e.component(ae.name,ae)};const _t=ae,gt=b({name:"ElContainer"}),bt=b({...gt,props:{direction:{type:String}},setup(e){const o=e,n=je(),t=S("container"),a=p(()=>o.direction==="vertical"?!0:o.direction==="horizontal"?!1:n&&n.default?n.default().some(i=>{const c=i.type.name;return c==="ElHeader"||c==="ElFooter"}):!1);return(f,i)=>(E(),z("section",{class:H([w(t).b(),w(t).is("vertical",w(a))])},[$(f.$slots,"default")],2))}});var yt=F(bt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue"]]);const Mt=b({name:"ElAside"}),Ct=b({...Mt,props:{width:{type:String,default:null}},setup(e){const o=e,n=S("aside"),t=p(()=>o.width?n.cssVarBlock({width:o.width}):{});return(a,f)=>(E(),z("aside",{class:H(w(n).b()),style:ge(w(t))},[$(a.$slots,"default")],6))}});var Oe=F(Ct,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue"]]);const xt=b({name:"ElFooter"}),It=b({...xt,props:{height:{type:String,default:null}},setup(e){const o=e,n=S("footer"),t=p(()=>o.height?n.cssVarBlock({height:o.height}):{});return(a,f)=>(E(),z("footer",{class:H(w(n).b()),style:ge(w(t))},[$(a.$slots,"default")],6))}});var Ne=F(It,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue"]]);const kt=b({name:"ElHeader"}),wt=b({...kt,props:{height:{type:String,default:null}},setup(e){const o=e,n=S("header"),t=p(()=>o.height?n.cssVarBlock({height:o.height}):{});return(a,f)=>(E(),z("header",{class:H(w(n).b()),style:ge(w(t))},[$(a.$slots,"default")],6))}});var ze=F(wt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue"]]);const St=b({name:"ElMain"}),$t=b({...St,setup(e){const o=S("main");return(n,t)=>(E(),z("main",{class:H(w(o).b())},[$(n.$slots,"default")],2))}});var He=F($t,[["__file","/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue"]]);const Et=Te(yt,{Aside:Oe,Footer:Ne,Header:ze,Main:He}),Tt=q(Oe);q(Ne);q(ze);const Bt=q(He);class Pt{constructor(o,n){this.parent=o,this.domNode=n,this.subIndex=0,this.subIndex=0,this.init()}init(){this.subMenuItems=this.domNode.querySelectorAll("li"),this.addListeners()}gotoSubIndex(o){o===this.subMenuItems.length?o=0:o<0&&(o=this.subMenuItems.length-1),this.subMenuItems[o].focus(),this.subIndex=o}addListeners(){const o=this.parent.domNode;Array.prototype.forEach.call(this.subMenuItems,n=>{n.addEventListener("keydown",t=>{let a=!1;switch(t.code){case A.down:{this.gotoSubIndex(this.subIndex+1),a=!0;break}case A.up:{this.gotoSubIndex(this.subIndex-1),a=!0;break}case A.tab:{ne(o,"mouseleave");break}case A.enter:case A.space:{a=!0,t.currentTarget.click();break}}return a&&(t.preventDefault(),t.stopPropagation()),!1})})}}class At{constructor(o,n){this.domNode=o,this.submenu=null,this.submenu=null,this.init(n)}init(o){this.domNode.setAttribute("tabindex","0");const n=this.domNode.querySelector(`.${o}-menu`);n&&(this.submenu=new Pt(this,n)),this.addListeners()}addListeners(){this.domNode.addEventListener("keydown",o=>{let n=!1;switch(o.code){case A.down:{ne(o.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(0),n=!0;break}case A.up:{ne(o.currentTarget,"mouseenter"),this.submenu&&this.submenu.gotoSubIndex(this.submenu.subMenuItems.length-1),n=!0;break}case A.tab:{ne(o.currentTarget,"mouseleave");break}case A.enter:case A.space:{n=!0,o.currentTarget.click();break}}n&&o.preventDefault()})}}class Ot{constructor(o,n){this.domNode=o,this.init(n)}init(o){const n=this.domNode.childNodes;Array.from(n).forEach(t=>{t.nodeType===1&&new At(t,o)})}}const Nt=b({name:"ElMenuCollapseTransition",setup(){const e=S("menu");return{listeners:{onBeforeEnter:n=>n.style.opacity="0.2",onEnter(n,t){ee(n,`${e.namespace.value}-opacity-transition`),n.style.opacity="1",t()},onAfterEnter(n){pe(n,`${e.namespace.value}-opacity-transition`),n.style.opacity=""},onBeforeLeave(n){n.dataset||(n.dataset={}),qe(n,e.m("collapse"))?(pe(n,e.m("collapse")),n.dataset.oldOverflow=n.style.overflow,n.dataset.scrollWidth=n.clientWidth.toString(),ee(n,e.m("collapse"))):(ee(n,e.m("collapse")),n.dataset.oldOverflow=n.style.overflow,n.dataset.scrollWidth=n.clientWidth.toString(),pe(n,e.m("collapse"))),n.style.width=`${n.scrollWidth}px`,n.style.overflow="hidden"},onLeave(n){ee(n,"horizontal-collapse-transition"),n.style.width=`${n.dataset.scrollWidth}px`}}}}});function zt(e,o,n,t,a,f){return E(),ue(Ee,$e({mode:"out-in"},e.listeners),{default:M(()=>[$(e.$slots,"default")]),_:3},16)}var Ht=F(Nt,[["render",zt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-collapse-transition.vue"]]);function Fe(e,o){const n=p(()=>{let a=e.parent;const f=[o.value];for(;a.type.name!=="ElMenu";)a.props.index&&f.unshift(a.props.index),a=a.parent;return f});return{parentMenu:p(()=>{let a=e.parent;for(;a&&!["ElMenu","ElSubMenu"].includes(a.type.name);)a=a.parent;return a}),indexPath:n}}function Ft(e){return p(()=>{const n=e.backgroundColor;return n?new Ge(n).shade(20).toString():""})}const Le=(e,o)=>{const n=S("menu");return p(()=>n.cssVarBlock({"text-color":e.textColor||"","hover-text-color":e.textColor||"","bg-color":e.backgroundColor||"","hover-bg-color":Ft(e).value||"","active-color":e.activeTextColor||"",level:`${o}`}))},Lt=be({index:{type:String,required:!0},showTimeout:{type:Number,default:300},hideTimeout:{type:Number,default:300},popperClass:String,disabled:Boolean,popperAppendToBody:{type:Boolean,default:void 0},popperOffset:{type:Number,default:6},expandCloseIcon:{type:te},expandOpenIcon:{type:te},collapseCloseIcon:{type:te},collapseOpenIcon:{type:te}}),me="ElSubMenu";var ke=b({name:me,props:Lt,setup(e,{slots:o,expose:n}){const t=Ie(),{indexPath:a,parentMenu:f}=Fe(t,p(()=>e.index)),i=S("menu"),c=S("sub-menu"),u=se("rootMenu");u||le(me,"can not inject root menu");const m=se(`subMenu:${f.value.uid}`);m||le(me,"can not inject sub menu");const v=T({}),h=T({});let x;const L=T(!1),re=T(),X=T(null),W=p(()=>l.value==="horizontal"&&G.value?"bottom-start":"right-start"),j=p(()=>l.value==="horizontal"&&G.value||l.value==="vertical"&&!u.props.collapse?e.expandCloseIcon&&e.expandOpenIcon?P.value?e.expandOpenIcon:e.expandCloseIcon:Ze:e.collapseCloseIcon&&e.collapseOpenIcon?P.value?e.collapseOpenIcon:e.collapseCloseIcon:Ue),G=p(()=>m.level===0),Y=p(()=>e.popperAppendToBody===void 0?G.value:Boolean(e.popperAppendToBody)),ie=p(()=>u.props.collapse?`${i.namespace.value}-zoom-in-left`:`${i.namespace.value}-zoom-in-top`),ce=p(()=>l.value==="horizontal"&&G.value?["bottom-start","bottom-end","top-start","top-end","right-start","left-start"]:["right-start","left-start","bottom-start","bottom-end","top-start","top-end"]),P=p(()=>u.openedMenus.includes(e.index)),V=p(()=>{let d=!1;return Object.values(v.value).forEach(_=>{_.active&&(d=!0)}),Object.values(h.value).forEach(_=>{_.active&&(d=!0)}),d}),J=p(()=>u.props.backgroundColor||""),Z=p(()=>u.props.activeTextColor||""),s=p(()=>u.props.textColor||""),l=p(()=>u.props.mode),r=ye({index:e.index,indexPath:a,active:V}),I=p(()=>l.value!=="horizontal"?{color:s.value}:{borderBottomColor:V.value?u.props.activeTextColor?Z.value:"":"transparent",color:V.value?Z.value:s.value}),y=()=>{var d,_,k;return(k=(_=(d=X.value)==null?void 0:d.popperRef)==null?void 0:_.popperInstanceRef)==null?void 0:k.destroy()},O=d=>{d||y()},R=()=>{u.props.menuTrigger==="hover"&&u.props.mode==="horizontal"||u.props.collapse&&u.props.mode==="vertical"||e.disabled||u.handleSubMenuClick({index:e.index,indexPath:a.value,active:V.value})},N=(d,_=e.showTimeout)=>{var k;d.type!=="focus"&&(u.props.menuTrigger==="click"&&u.props.mode==="horizontal"||!u.props.collapse&&u.props.mode==="vertical"||e.disabled||(m.mouseInChild.value=!0,x==null||x(),{stop:x}=we(()=>{u.openMenu(e.index,a.value)},_),Y.value&&((k=f.value.vnode.el)==null||k.dispatchEvent(new MouseEvent("mouseenter")))))},B=(d=!1)=>{var _,k;u.props.menuTrigger==="click"&&u.props.mode==="horizontal"||!u.props.collapse&&u.props.mode==="vertical"||(x==null||x(),m.mouseInChild.value=!1,{stop:x}=we(()=>!L.value&&u.closeMenu(e.index,a.value),e.hideTimeout),Y.value&&d&&((_=t.parent)==null?void 0:_.type.name)==="ElSubMenu"&&((k=m.handleMouseleave)==null||k.call(m,!0)))};oe(()=>u.props.collapse,d=>O(Boolean(d)));{const d=k=>{h.value[k.index]=k},_=k=>{delete h.value[k.index]};he(`subMenu:${t.uid}`,{addSubMenu:d,removeSubMenu:_,handleMouseleave:B,mouseInChild:L,level:m.level+1})}return n({opened:P}),Me(()=>{u.addSubMenu(r),m.addSubMenu(r)}),Be(()=>{m.removeSubMenu(r),u.removeSubMenu(r)}),()=>{var d;const _=[(d=o.title)==null?void 0:d.call(o),C(Ce,{class:c.e("icon-arrow"),style:{transform:P.value?e.expandCloseIcon&&e.expandOpenIcon||e.collapseCloseIcon&&e.collapseOpenIcon&&u.props.collapse?"none":"rotateZ(180deg)":"none"}},{default:()=>U(j.value)?C(t.appContext.components[j.value]):C(j.value)})],k=Le(u.props,m.level+1),De=u.isMenuPopup?C(Pe,{ref:X,visible:P.value,effect:"light",pure:!0,offset:e.popperOffset,showArrow:!1,persistent:!0,popperClass:e.popperClass,placement:W.value,teleported:Y.value,fallbackPlacements:ce.value,transition:ie.value,gpuAcceleration:!1},{content:()=>{var K;return C("div",{class:[i.m(l.value),i.m("popup-container"),e.popperClass],onMouseenter:de=>N(de,100),onMouseleave:()=>B(!0),onFocus:de=>N(de,100)},[C("ul",{class:[i.b(),i.m("popup"),i.m(`popup-${W.value}`)],style:k.value},[(K=o.default)==null?void 0:K.call(o)])])},default:()=>C("div",{class:c.e("title"),style:[I.value,{backgroundColor:J.value}],onClick:R},_)}):C(xe,{},[C("div",{class:c.e("title"),style:[I.value,{backgroundColor:J.value}],ref:re,onClick:R},_),C(_t,{},{default:()=>{var K;return Ye(C("ul",{role:"menu",class:[i.b(),i.m("inline")],style:k.value},[(K=o.default)==null?void 0:K.call(o)]),[[Je,P.value]])}})]);return C("li",{class:[c.b(),c.is("active",V.value),c.is("opened",P.value),c.is("disabled",e.disabled)],role:"menuitem",ariaHaspopup:!0,ariaExpanded:P.value,onMouseenter:N,onMouseleave:()=>B(!0),onFocus:N},[De])}}});const Vt=be({mode:{type:String,values:["horizontal","vertical"],default:"vertical"},defaultActive:{type:String,default:""},defaultOpeneds:{type:_e(Array),default:()=>Ke([])},uniqueOpened:Boolean,router:Boolean,menuTrigger:{type:String,values:["hover","click"],default:"hover"},collapse:Boolean,backgroundColor:String,textColor:String,activeTextColor:String,collapseTransition:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0},popperEffect:{type:String,values:["dark","light"],default:"dark"}}),fe=e=>Array.isArray(e)&&e.every(o=>U(o)),Rt={close:(e,o)=>U(e)&&fe(o),open:(e,o)=>U(e)&&fe(o),select:(e,o,n,t)=>U(e)&&fe(o)&&nt(n)&&(t===void 0||t instanceof Promise)};var Dt=b({name:"ElMenu",props:Vt,emits:Rt,setup(e,{emit:o,slots:n,expose:t}){const a=Ie(),f=a.appContext.config.globalProperties.$router,i=T(),c=S("menu"),u=S("sub-menu"),m=T(-1),v=T(e.defaultOpeneds&&!e.collapse?e.defaultOpeneds.slice(0):[]),h=T(e.defaultActive),x=T({}),L=T({}),re=p(()=>e.mode==="horizontal"||e.mode==="vertical"&&e.collapse),X=()=>{const s=h.value&&x.value[h.value];if(!s||e.mode==="horizontal"||e.collapse)return;s.indexPath.forEach(r=>{const I=L.value[r];I&&W(r,I.indexPath)})},W=(s,l)=>{v.value.includes(s)||(e.uniqueOpened&&(v.value=v.value.filter(r=>l.includes(r))),v.value.push(s),o("open",s,l))},j=(s,l)=>{const r=v.value.indexOf(s);r!==-1&&v.value.splice(r,1),o("close",s,l)},G=({index:s,indexPath:l})=>{v.value.includes(s)?j(s,l):W(s,l)},Y=s=>{(e.mode==="horizontal"||e.collapse)&&(v.value=[]);const{index:l,indexPath:r}=s;if(!(l===void 0||r===void 0))if(e.router&&f){const I=s.route||l,y=f.push(I).then(O=>(O||(h.value=l),O));o("select",l,r,{index:l,indexPath:r,route:I},y)}else h.value=l,o("select",l,r,{index:l,indexPath:r})},ie=s=>{const l=x.value,r=l[s]||h.value&&l[h.value]||l[e.defaultActive];r?h.value=r.index:h.value=s},ce=()=>{var s,l;if(!i.value)return-1;const r=Array.from((l=(s=i.value)==null?void 0:s.childNodes)!=null?l:[]).filter(d=>d.nodeName!=="#text"||d.nodeValue),I=64,y=Number.parseInt(getComputedStyle(i.value).paddingLeft,10),O=Number.parseInt(getComputedStyle(i.value).paddingRight,10),R=i.value.clientWidth-y-O;let N=0,B=0;return r.forEach((d,_)=>{N+=d.offsetWidth||0,N<=R-I&&(B=_+1)}),B===r.length?-1:B},P=(s,l=33.34)=>{let r;return()=>{r&&clearTimeout(r),r=setTimeout(()=>{s()},l)}};let V=!0;const J=()=>{const s=()=>{m.value=-1,ot(()=>{m.value=ce()})};V?s():P(s)(),V=!1};oe(()=>e.defaultActive,s=>{x.value[s]||(h.value=""),ie(s)}),oe(()=>e.collapse,s=>{s&&(v.value=[])}),oe(x.value,X);let Z;Qe(()=>{e.mode==="horizontal"&&e.ellipsis?Z=Xe(i,J).stop:Z==null||Z()});{const s=y=>{L.value[y.index]=y},l=y=>{delete L.value[y.index]};he("rootMenu",ye({props:e,openedMenus:v,items:x,subMenus:L,activeIndex:h,isMenuPopup:re,addMenuItem:y=>{x.value[y.index]=y},removeMenuItem:y=>{delete x.value[y.index]},addSubMenu:s,removeSubMenu:l,openMenu:W,closeMenu:j,handleMenuItemClick:Y,handleSubMenuClick:G})),he(`subMenu:${a.uid}`,{addSubMenu:s,removeSubMenu:l,mouseInChild:T(!1),level:0})}return Me(()=>{e.mode==="horizontal"&&new Ot(a.vnode.el,c.namespace.value)}),t({open:l=>{const{indexPath:r}=L.value[l];r.forEach(I=>W(I,r))},close:j,handleResize:J}),()=>{var s,l;let r=(l=(s=n.default)==null?void 0:s.call(n))!=null?l:[];const I=[];if(e.mode==="horizontal"&&i.value){const R=et(r),N=m.value===-1?R:R.slice(0,m.value),B=m.value===-1?[]:R.slice(m.value);(B==null?void 0:B.length)&&e.ellipsis&&(r=N,I.push(C(ke,{index:"sub-menu-more",class:u.e("hide-arrow")},{title:()=>C(Ce,{class:u.e("icon-more")},{default:()=>C(tt)}),default:()=>B})))}const y=Le(e,0),O=C("ul",{key:String(e.collapse),role:"menubar",ref:i,style:y.value,class:{[c.b()]:!0,[c.m(e.mode)]:!0,[c.m("collapse")]:e.collapse}},[...r,...I]);return e.collapseTransition&&e.mode==="vertical"?C(Ht,()=>O):O}}});const Wt=be({index:{type:_e([String,null]),default:null},route:{type:_e([String,Object])},disabled:Boolean}),jt={click:e=>U(e.index)&&Array.isArray(e.indexPath)},ve="ElMenuItem",qt=b({name:ve,components:{ElTooltip:Pe},props:Wt,emits:jt,setup(e,{emit:o}){const n=Ie(),t=se("rootMenu"),a=S("menu"),f=S("menu-item");t||le(ve,"can not inject root menu");const{parentMenu:i,indexPath:c}=Fe(n,at(e,"index")),u=se(`subMenu:${i.value.uid}`);u||le(ve,"can not inject sub menu");const m=p(()=>e.index===t.activeIndex),v=ye({index:e.index,indexPath:c,active:m}),h=()=>{e.disabled||(t.handleMenuItemClick({index:e.index,indexPath:c.value,route:e.route}),o("click",v))};return Me(()=>{u.addSubMenu(v),t.addMenuItem(v)}),Be(()=>{u.removeSubMenu(v),t.removeMenuItem(v)}),{parentMenu:i,rootMenu:t,active:m,nsMenu:a,nsMenuItem:f,handleClick:h}}});function Gt(e,o,n,t,a,f){const i=Ae("el-tooltip");return E(),z("li",{class:H([e.nsMenuItem.b(),e.nsMenuItem.is("active",e.active),e.nsMenuItem.is("disabled",e.disabled)]),role:"menuitem",tabindex:"-1",onClick:o[0]||(o[0]=(...c)=>e.handleClick&&e.handleClick(...c))},[e.parentMenu.type.name==="ElMenu"&&e.rootMenu.props.collapse&&e.$slots.title?(E(),ue(i,{key:0,effect:e.rootMenu.props.popperEffect,placement:"right","fallback-placements":["left"],persistent:""},{content:M(()=>[$(e.$slots,"title")]),default:M(()=>[D("div",{class:H(e.nsMenu.be("tooltip","trigger"))},[$(e.$slots,"default")],2)]),_:3},8,["effect"])):(E(),z(xe,{key:1},[$(e.$slots,"default"),$(e.$slots,"title")],64))],2)}var Ve=F(qt,[["render",Gt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item.vue"]]);const Zt={title:String},Ut="ElMenuItemGroup",Yt=b({name:Ut,props:Zt,setup(){return{ns:S("menu-item-group")}}});function Jt(e,o,n,t,a,f){return E(),z("li",{class:H(e.ns.b())},[D("div",{class:H(e.ns.e("title"))},[e.$slots.title?$(e.$slots,"title",{key:1}):(E(),z(xe,{key:0},[st(lt(e.title),1)],64))],2),D("ul",null,[$(e.$slots,"default")])],2)}var Re=F(Yt,[["render",Jt],["__file","/home/runner/work/element-plus/element-plus/packages/components/menu/src/menu-item-group.vue"]]);const Kt=Te(Dt,{MenuItem:Ve,MenuItemGroup:Re,SubMenu:ke}),Qt=q(Ve);q(Re);q(ke);const Q=e=>(pt("data-v-2e764576"),e=e(),mt(),e),Xt=Q(()=>D("span",{class:"web-name"},"My Stack \u7BA1\u7406\u540E\u53F0",-1)),en=Q(()=>D("span",null,"\u535A\u5BA2\u7BA1\u7406",-1)),tn=Q(()=>D("span",null,"\u7528\u6237\u7BA1\u7406",-1)),nn=Q(()=>D("span",null,"\u8BC4\u8BBA\u7BA1\u7406",-1)),on=Q(()=>D("span",null,"\u5B57\u5178\u7BA1\u7406",-1)),an=b({__name:"index",setup(e){console.log(Se().fullPath);const o=(t,a)=>{console.log(t,a)},n=(t,a)=>{console.log(t,a)};return(t,a)=>{const f=dt,i=Qt,c=Ce,u=Kt,m=Tt,v=Ae("RouterView"),h=Bt,x=Et;return E(),ue(x,null,{default:M(()=>[g(m,{width:"200px",class:"sidebar"},{default:M(()=>[g(u,{router:"","background-color":"black","text-color":"#fff",onOpen:o,onClose:n,"default-active":w(Se)().fullPath},{default:M(()=>[g(i,{index:"/",class:"logo"},{default:M(()=>[g(f,{icon:"edit",active:"",size:"15px"}),Xt]),_:1}),g(i,{index:"/admin/blog"},{default:M(()=>[g(c,null,{default:M(()=>[g(w(ut))]),_:1}),en]),_:1}),g(i,{index:"/admin/user"},{default:M(()=>[g(c,null,{default:M(()=>[g(w(rt))]),_:1}),tn]),_:1}),g(i,{index:"/admin/comment"},{default:M(()=>[g(c,null,{default:M(()=>[g(w(it))]),_:1}),nn]),_:1}),g(i,{index:"/admin/dict"},{default:M(()=>[g(c,null,{default:M(()=>[g(w(ct))]),_:1}),on]),_:1})]),_:1},8,["default-active"])]),_:1}),g(h,{class:"main"},{default:M(()=>[g(v)]),_:1})]),_:1})}}});const ln=ft(an,[["__scopeId","data-v-2e764576"]]);export{ln as default};
