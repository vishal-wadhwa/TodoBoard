(function(e){function t(t){for(var n,a,s=t[0],c=t[1],l=t[2],u=0,d=[];u<s.length;u++)a=s[u],i[a]&&d.push(i[a][0]),i[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);m&&m(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,a=1;a<r.length;a++){var s=r[a];0!==i[s]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},a={app:0},i={app:0},o=[];function s(e){return c.p+"js/"+({home:"home"}[e]||e)+"."+{home:"816414e6"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={home:1};a[e]?t.push(a[e]):0!==a[e]&&r[e]&&t.push(a[e]=new Promise(function(t,r){for(var n="css/"+({home:"home"}[e]||e)+"."+{home:"be50e3f9"}[e]+".css",i=c.p+n,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var l=o[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===i))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){l=d[s],u=l.getAttribute("data-href");if(u===n||u===i)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var n=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.request=n,delete a[e],m.parentNode.removeChild(m),r(o)},m.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(m)}).then(function(){a[e]=0}));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,r){n=i[e]=[t,r]});t.push(n[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(e),l=function(t){u.onerror=u.onload=null,clearTimeout(d);var r=i[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+n+": "+a+")");o.type=n,o.request=a,r[1](o)}i[e]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/TodoBoard/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var m=u;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0515":function(e,t,r){"use strict";var n=r("b08f"),a=r.n(n);a.a},1170:function(e,t,r){},"187b":function(e,t,r){"use strict";var n=r("1170"),a=r.n(n);a.a},"4e7c":function(e,t,r){e.exports=r.p+"img/github-logo.8237281a.png"},"53f4":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var n=r("2b0e"),a=r("bb71"),i=(r("da64"),r("7f7f"),r("6bde")),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"v-snack-transition"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"v-snack",class:e.classes,attrs:{on:e.$listeners}},[r("div",{staticClass:"v-snack__wrapper",style:e.setBackgroundColor(e.color,{}).style},[r("div",{staticClass:"v-snack__content"},[r("v-icon",{staticClass:"mr-3",attrs:{color:e.type,medium:""}},[e._v(e._s(e.TYPE_TO_ICON[e.type]))]),e._v("\n        "+e._s(e.msg)+"\n        "),r("v-btn",{attrs:{color:"pink",flat:""},on:{click:e.onClose}},[e._v("Close")])],1)])])])},s=[],c=r("2db4"),l=new n["default"],u={name:"Notify",extends:c["a"],data:function(){return{type:"info",msg:"",TYPE_TO_ICON:{success:"check_circle",info:"info",warning:"warning",error:"error"}}},methods:{notify:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.msg&&(this.onClose(),this.msg=t.msg,this.type=t.type||"info",this.$nextTick(function(){return e.isActive=!0}))},onClose:function(){this.isActive=!1,window.clearTimeout(this.activeTimeout)},setTimeout:function(){this.isActive&&(this.activeTimeout=window.setTimeout(this.onClose,this.timeout))}},created:function(){l.$on("show",this.notify)}},d=u,m=r("2877"),f=r("6544"),p=r.n(f),g=r("8336"),h=r("132d"),b=Object(m["a"])(d,o,s,!1,null,null,null),v=b.exports;p()(b,{VBtn:g["a"],VIcon:h["a"]});var w={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!this.installed){this.installed=!0,this.params=t,e.component(t.componentName||"notify",v);var r=function(e){"object"===Object(i["a"])(e)&&l.$emit("show",e)},n=t.name||"notify";e.prototype["$"+n]=r,e[n]=r}}},y=w;n["default"].use(a["a"],{iconfont:"md",theme:{primary:"#03a9f4",secondary:"#000000"}}),n["default"].use(y);var _=function(){var e=this,t=this,r=t.$createElement,n=t._self._c||r;return n("v-app",["login"!==t.$route.name?n("title-bar",{staticClass:"primary",attrs:{title:"Todo board",fullname:t.$store.getters["login/fullname"]},on:{"tb:log-out":function(e){t.$store.dispatch("login/logout")}}},[n("v-toolbar-side-icon",{attrs:{slot:"toolbar-icon"},on:{click:function(e){t.drawer=!t.drawer}},slot:"toolbar-icon"},[n("v-icon",{attrs:{color:"white"}},[t._v(t._s(t.drawer?"close":"menu"))])],1),n("v-toolbar-title",{attrs:{slot:"toolbar-heading"},slot:"toolbar-heading"},[n("app-logo",{attrs:{color:"black",size:"2rem"}})],1)],1):t._e(),"login"!==t.$route.name?n("ext-nav-drawer",{attrs:{"board-list":t.boardNames,"default-image-src":t.defImgPath,"show-new-field-box":t.boardForm},on:{"end:img-error":function(t){return e.$notify({type:"error",msg:t})},"end:img-warning":function(t){return e.$notify({type:"warning",msg:t})},"end:board-delete":t.onBoardDelete,"end:bname-discard":function(e){t.boardForm=!1},"end:blur":function(e){t.boardForm=!1},"end:bname-save":t.onBoardCreate},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}}):t._e(),n("v-content",[n("v-progress-linear",{staticClass:"ma-0",staticStyle:{position:"fixed"},attrs:{query:"",height:"4",active:t.active,color:t.color,indeterminate:t.indeterminate,value:t.progressVal}}),n("router-view")],1),n("notify",{attrs:{bottom:"","auto-height":""}})],1)},I=[],x=(r("96cf"),r("3040")),O=r("c93e"),S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-navigation-drawer",{staticClass:"pa-2",attrs:{value:e.state,fixed:"",clipped:"",app:"",width:"280"},on:{input:function(t){return e.$emit("end:change",t)}}},[r("v-layout",{attrs:{column:""}},[r("v-flex",{staticClass:"text-xs-center"},[r("profile-picture",{attrs:{"default-image-src":e.defaultImageSrc,"server-config":e.serverConfig},on:{"pp:error":function(t){return e.$emit("end:img-error",t)},"pp:warning":function(t){return e.$emit("end:img-warning",t)}}})],1),r("v-list",{attrs:{subheader:"",dense:""}},[r("v-list-tile",[r("v-subheader",{staticClass:"mt-3"},[e._v("Boards")])],1),e._l(e.boardList,function(t){return r("v-list-tile",{key:t._id,attrs:{avatar:"","active-class":"primary lighten-3",to:{name:"home",params:{boardId:t._id}},title:t.boardName},on:{click:function(r){return e.$emit("end:board-click",t._id,r)},mouseover:function(r){e.$set(e.deleteBtnVisible,t._id,!0)},mouseout:function(r){e.deleteBtnVisible[t._id]=!1}}},[r("v-list-tile-avatar",[r("v-icon",[e._v("chrome_reader_mode")])],1),r("v-list-tile-title",{staticClass:"font-weight-bold",domProps:{textContent:e._s(t.boardName)}}),r("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.deleteBtnVisible[t._id],expression:"deleteBtnVisible[board._id]"}],attrs:{flat:"",icon:"",small:"",title:""},on:{click:function(r){return r.preventDefault(),r.stopPropagation(),function(r){return e.onBoardDelete(t._id,r)}(r)}}},[r("v-icon",{attrs:{small:""}},[e._v("delete")])],1)],1)})],2),r("v-text-field",{directives:[{name:"show",rawName:"v-show",value:e.showNewFieldBox,expression:"showNewFieldBox"}],ref:"bnameFieldBox",staticClass:"ml-4 my-0 pa-0 body-1",attrs:{clearable:"",placeholder:"My board",flat:"","single-line":"","append-outer-icon":"check_circle","error-messages":e.errMsg},on:{keydown:[function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.onBoardNameSave(t):null},function(t){return"button"in t||!e._k(t.keyCode,"esc",27,t.key,"Escape")?e.onBoardNameDiscard(t):null}],"click:append-outer":e.onBoardNameSave,blur:function(t){return e.$emit("end:blur",t)}},model:{value:e.newBoardName,callback:function(t){e.newBoardName=t},expression:"newBoardName"}})],1)],1)},B=[],k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("file-pond",{ref:"ppic",attrs:{"image-validate-size-min-width":"10","image-validate-size-min-height":"10","label-idle":'<span class="filepond--label-action">Upload</span> a profile picture',"max-file-size":"1MB",name:"profile-pic","style-panel-layout":"compact circle","style-load-indicator-position":"center bottom","style-progress-indicator-position":"right bottom","style-button-process-item-position":"right bottom","style-button-remove-item-position":"center bottom","accepted-file-types":["image/jpeg","image/png"],files:e.imgs,"image-preview-height":e.height-10,"image-resize-target-width":e.height,"image-resize-target-height":e.height,server:e.serverConfig},on:{error:e.onError,warning:e.onWarning}})},j=[],T=(r("c5f6"),r("1501")),R=r.n(T),N=(r("4ed3"),r("57c8"),r("3b96")),A=r.n(N),C=r("1942"),D=r.n(C),V=r("82d3"),$=r.n(V),L=r("2cfc"),E=r.n(L),P=r("3505"),F=r.n(P),z=r("4f37"),G=r.n(z),U=R()(A.a,D.a,$.a,E.a,F.a,G.a),M={components:{FilePond:U},props:{defaultImageSrc:String,height:{type:[String,Number],default:200},serverConfig:Object},data:function(){return{imgs:[]}},methods:{onError:function(e,t,r){t.abortLoad(),t.abortProcessing(),this.$refs["ppic"].removeFile(t.id),this.$emit("pp:error","Error ".concat(e.code,": ").concat(e.body,"."))},onWarning:function(e,t,r){t.abortLoad(),t.abortProcessing(),this.$refs["ppic"].removeFile(t.id),this.$emit("pp:warning","Error ".concat(e.code,": ").concat(e.body,"."))}},created:function(){this.defaultImageSrc&&this.imgs.push(this.defaultImageSrc)}},q=M,J=(r("187b"),Object(m["a"])(q,k,j,!1,null,null,null)),W=J.exports,Y={components:{ProfilePicture:W},model:{prop:"state",event:"end:change"},props:{state:{type:Boolean,default:!0},boardList:{type:Array,default:function(){return[]}},showNewFieldBox:{type:Boolean,default:!1},defaultImageSrc:String,serverConfig:Object},data:function(){return{newBoardName:"",ERROR_MSG:"Board name can't be empty",errMsg:"",deleteBtnVisible:{}}},methods:{onBoardNameSave:function(e){0!==this.newBoardName.trim().length?(this.$emit("end:bname-save",this.newBoardName.trim(),e),this.newBoardName=""):this.errMsg=this.ERROR_MSG},onBoardNameDiscard:function(e){this.$emit("end:bname-discard",e),this.newBoardName="",this.errMsg=""},onBoardDelete:function(e,t){delete this.deleteBtnVisible[e],this.$emit("end:board-delete",e,t)}},watch:{showNewFieldBox:function(e){e&&this.$nextTick(this.$refs.bnameFieldBox.focus)}}},H=Y,K=r("0e8f"),Q=r("a722"),X=r("8860"),Z=r("ba95"),ee=r("c954"),te=r("5d23"),re=r("f774"),ne=r("e0c7"),ae=r("2677"),ie=Object(m["a"])(H,S,B,!1,null,"6044e3fc",null),oe=ie.exports;p()(ie,{VBtn:g["a"],VFlex:K["a"],VIcon:h["a"],VLayout:Q["a"],VList:X["a"],VListTile:Z["a"],VListTileAvatar:ee["a"],VListTileTitle:te["b"],VNavigationDrawer:re["a"],VSubheader:ne["a"],VTextField:ae["a"]});var se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-toolbar",{attrs:{app:"",fixed:"","clipped-left":""}},[e._t("toolbar-icon"),e._t("toolbar-heading",[n("v-toolbar-title",{staticClass:"headline text-uppercase"},[n("span",[e._v(e._s(e.title))])])]),n("v-spacer"),e._t("toolbar-content-right",[n("span",{staticClass:"title font-weight-light font-italic white--text"},[e._v(e._s(e.fullname))]),n("v-btn",{staticClass:"mr-0",attrs:{fab:"",small:"",flat:"",href:"https://github.com/vishal-wadhwa/TodoBoard",target:"_blank"}},[n("v-avatar",{attrs:{size:"20px"}},[n("img",{attrs:{src:r("4e7c"),alt:"github"}})])],1),n("v-btn",{staticClass:"ml-0",attrs:{fab:"",small:"",flat:"",title:"Log Out"},on:{click:function(t){return e.$emit("tb:log-out",t)}}},[n("v-icon",{attrs:{color:"white"}},[e._v("power_settings_new")])],1)])],2)},ce=[],le={props:{title:String,fullname:String}},ue=le,de=r("8212"),me=r("9910"),fe=r("71d9"),pe=r("2a7f"),ge=Object(m["a"])(ue,se,ce,!1,null,"0ed7bf76",null),he=ge.exports;p()(ge,{VAvatar:de["a"],VBtn:g["a"],VIcon:h["a"],VSpacer:me["a"],VToolbar:fe["a"],VToolbarTitle:pe["a"]});var be=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticStyle:{"border-radius":"15px",padding:"2px","border-bottom":"3px double"},style:e.styling},[r("strong",[e._v(e._s(e.mini?"T":"TODO"))]),r("em",{staticClass:"font-weight-thin"},[e._v("Board")])])},ve=[],we={props:{size:{type:[String,Number],default:14},color:{type:String,default:"white"},mini:{type:Boolean,default:!1}},computed:{styling:function(){return{fontSize:this.isNumericSize?this.size+"px":this.size,color:this.color}},isNumericSize:function(){return!isNaN(parseFloat(this.size))&&isFinite(this.size)}}},ye=we,_e=Object(m["a"])(ye,be,ve,!1,null,null,null),Ie=_e.exports,xe=r("2f62"),Oe={name:"App",components:{ExtNavDrawer:oe,TitleBar:he,AppLogo:Ie},data:function(){return{defImgPath:r("690a")}},computed:Object(O["a"])({drawer:{get:function(){return this.$store.state.drawer},set:function(e){this.$store.commit("setDrawerState",e)}},boardForm:{get:function(){return this.$store.state.boardForm},set:function(e){this.$store.commit("setBoardFormState",e)}}},Object(xe["c"])("board",["boardNames"]),Object(xe["d"])("progress",["active","progressVal","color"]),Object(xe["c"])("progress",["indeterminate"])),methods:Object(O["a"])({},Object(xe["b"])("board",["createBoard","deleteBoard"]),{onBoardCreate:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.boardForm=!1,e.next=3,this.createBoard({boardName:t});case 3:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),onBoardDelete:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.deleteBoard(t);case 2:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()})},Se=Oe,Be=r("7496"),ke=r("549c"),je=r("8e36"),Te=r("706c"),Re=Object(m["a"])(Se,_,I,!1,null,null,null),Ne=Re.exports;p()(Re,{VApp:Be["a"],VContent:ke["a"],VIcon:h["a"],VProgressLinear:je["a"],VToolbarSideIcon:Te["a"],VToolbarTitle:pe["a"]});var Ae=r("8c4f"),Ce=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"login-view pa-0",attrs:{fluid:"","justify-center":"","align-center":"","fill-height":""}},[n("v-card",{staticClass:"ma-5",attrs:{height:"75vh",width:"75vw",img:r("acc8"),raised:""}},[n("v-layout",{staticClass:"login-view__content",attrs:{row:"","fill-height":""}},[n("app-logo",{staticClass:"logo",attrs:{color:"black",size:"1.5rem"}}),n("v-flex",{staticClass:"login-fields-container",attrs:{md4:"",xs12:""}},[n("v-form",{ref:"form",staticClass:"mx-4 mt-5",staticStyle:{width:"100%"}},[e.curState===e.STATE_SIGN_UP?n("v-text-field",{ref:"fullNameField",attrs:{color:"primary darken-2",label:"Full Name",type:"text",rules:e.rules.fullname,"validate-on-blur":"",autofocus:""},on:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?function(t){return e.onSubmit(t)}(t):null}},model:{value:e.fullname,callback:function(t){e.fullname="string"===typeof t?t.trim():t},expression:"fullname"}}):e._e(),n("v-text-field",{ref:"emailField",attrs:{color:"primary darken-2",label:"Email ID",type:"email",rules:e.rules.email,"validate-on-blur":""},on:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?function(t){return e.onSubmit(t)}(t):null}},model:{value:e.email,callback:function(t){e.email="string"===typeof t?t.trim():t},expression:"email"}}),n("v-text-field",{attrs:{color:"primary darken-2",label:"Password",type:e.showPass?"text":"password",rules:e.rules.password,"validate-on-blur":"","append-icon":e.showPass?"visibility_off":"visibility",counter:"",hint:"Password must have a minimum of 8 letters"},on:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?function(t){return e.onSubmit(t)}(t):null},"click:append":function(t){e.showPass=!e.showPass}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),n("v-layout",{staticClass:"mt-3",attrs:{"justify-space-between":""}},[n("v-layout",[n("o-auth-login-btn",{attrs:{"icon-src":r("d907"),title:"Google","text-color":"#757575","btn-bg":"white"},nativeOn:{click:function(t){e.$notify({type:"info",msg:"Dummy button"})}}}),n("o-auth-login-btn",{attrs:{"icon-src":r("a72f"),title:"Guest","btn-bg":"rgba(244, 180, 0, 0.5)","icon-bg":"rgba(244, 180, 0, 1)"},nativeOn:{click:function(t){e.$notify({type:"info",msg:"Dummy button"})}}})],1),n("v-layout",{attrs:{"align-end":"",column:""}},[n("v-btn",{staticClass:"ma-0 secondary",attrs:{round:"",loading:e.authenticating,small:e.$vuetify.breakpoint.xs},on:{click:e.onSubmit}},[e._v(e._s(e.curState===e.STATE_SIGN_IN?"LogIn":"SignUp"))]),n("span",{staticClass:"btn-create-acct body-1 text-xs-center",domProps:{innerHTML:e._s(e.curState===e.STATE_SIGN_IN?"Create<br>account?":"Login?")},on:{click:e.toggleState}})],1)],1)],1)],1),e.$vuetify.breakpoint.mdAndUp?n("v-flex",{staticClass:"welcome-msg",attrs:{md8:""}},[n("span",{staticClass:"welcome-msg__welcome"},[e._v("Welcome to")]),n("br"),n("app-logo",{attrs:{size:"6rem"}})],1):e._e()],1)],1)],1)},De=[],Ve=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"v-chip chip-wrapper ma-0",style:{background:e.btnBg,color:e.textColor,border:"1px solid "+e.iconBg},attrs:{title:e.title}},[e.iconSrc?r("v-avatar",{staticClass:"ma-0 pa-1",style:{background:e.iconBg},attrs:{size:"32"}},[r("img",{attrs:{src:e.iconSrc,alt:"login"}})]):e._e(),e._v("\n   "+e._s(e.title)+" \n")],1)},$e=[],Le={props:{iconSrc:String,title:String,iconBg:{type:String,default:"rgba(0, 0, 0, 0.15)"},btnBg:{type:String,default:"rgba(0, 0, 0, 0.05)"},textColor:{type:String,default:"black"}}},Ee=Le,Pe=(r("0515"),Object(m["a"])(Ee,Ve,$e,!1,null,"4e3bfe63",null)),Fe=Pe.exports;p()(Pe,{VAvatar:de["a"]});var ze="SIGN_UP",Ge="SIGN_IN",Ue={components:{AppLogo:Ie,OAuthLoginBtn:Fe},data:function(){return{STATE_SIGN_UP:ze,STATE_SIGN_IN:Ge,curState:ze,email:"",password:"",fullname:"",showPass:!1,rules:{email:[function(e){return!!e&&/\S+@\S+\.\S+/.test(e.trim().toLowerCase())||"Please enter a valid email ID"}],password:[function(e){return(!!e&&e.length)>=8||"Password must have a minimum of 8 letters"}],fullname:[function(e){return!!e&&!!e.trim().length||"Please enter your full name"}]},authenticating:!1}},methods:Object(O["a"])({toggleState:function(){this.curState=this.curState===this.STATE_SIGN_UP?this.STATE_SIGN_IN:this.STATE_SIGN_UP,this.$refs.form.reset(),this.curState===this.STATE_SIGN_IN&&this.$nextTick(this.$refs.emailField.focus)},onSubmit:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.$refs.form.validate()){e.next=2;break}return e.abrupt("return");case 2:if(this.authenticating=!0,this.curState!==this.STATE_SIGN_UP){e.next=8;break}return e.next=6,this.signUp({email:this.email,password:this.password,fullname:this.fullname});case 6:e.next=10;break;case 8:return e.next=10,this.login({email:this.email,password:this.password});case 10:this.authenticating=!1;case 11:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},Object(xe["b"])("login",["login","signUp","logout"])),created:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.logout();case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),mounted:function(){this.$notify({type:"warning",msg:"This is a practice project and works on browser localStorage with dummy login. Just signup with any credentials."})}},Me=Ue,qe=(r("6e0b"),r("b0af")),Je=r("a523"),We=r("4bd4"),Ye=Object(m["a"])(Me,Ce,De,!1,null,"135e2b8c",null),He=Ye.exports;p()(Ye,{VBtn:g["a"],VCard:qe["a"],VContainer:Je["a"],VFlex:K["a"],VForm:We["a"],VLayout:Q["a"],VTextField:ae["a"]});r("20d6"),r("7514");var Ke=r("133d"),Qe=(r("6b54"),function(e,t){return localStorage.getItem(e)||t}),Xe=function(e,t){return localStorage.getItem(e)||t},Ze=function(e,t){return Number(localStorage.getItem(e))>>0||t},et=function(e,t){return Number(localStorage.getItem(e))||t},tt=function(e,t){return JSON.parse(localStorage.getItem(e))||t},rt=function(e,t){localStorage.setItem(e,t)},nt=function(e,t){localStorage.setItem(e,t)},at=function(e,t){localStorage.setItem(e,t)},it=function(e,t){localStorage.setItem(e,t)},ot=function(e,t){localStorage.setItem(e,JSON.stringify(t))},st=function(e){return localStorage.removeItem(e)},ct={readBoolean:Qe,readString:Xe,readInt:Ze,readDouble:et,readObject:tt,writeBoolean:rt,writeString:nt,writeInt:at,writeDouble:it,writeObject:ot,clear:st},lt=ct,ut=function(e){return function(t){return t._id===e}},dt=(function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.state,a=t.commit,a("loadBoard",{boardId:r,data:n.boards.find(ut(r)).lists});case 2:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=(new Date).getTime().toString(),i=Object(O["a"])({},r,{_id:a}),n("createBoard",i);case 4:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,n("deleteBoard",{boardId:r});case 2:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=t.getters,i=a.activeBoardId,o=i+":"+(new Date).getTime().toString(),s=Object(O["a"])({},r,{_id:o,boardId:i}),n("createList",s);case 5:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=t.getters,n("deleteList",{boardId:a.activeBoardId,listId:r});case 2:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s,c,l,u;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.state,a=t.commit,i=t.getters,o=i.activeBoardId,s=r.listId+":"+(new Date).getTime().toString(),c=n.boards.find(ut(o)),l=c.lists.find(ut(r.listId)),u=Object(O["a"])({},r.listItem,{_id:s,boardId:o,listId:r.listId,type:l.type}),a("createListItem",u);case 7:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=t.getters,n("deleteListItem",Object(O["a"])({boardId:a.activeBoardId},r));case 2:case"end":return e.stop()}},e,this)}))}(),{loadBoard:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.state,a=t.commit,i={boardId:r},o=n.boards.find(ut(r)),o.lists.length>0?i.data=o.lists:i.data=lt.readObject("BOARD_DATA_"+r,[]),a("loadBoard",i);case 5:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),createBoard:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=(new Date).getTime().toString(),i=Object(O["a"])({},r,{_id:a}),o=lt.readObject("BOARDS",[]),o.push(i),lt.writeObject("BOARDS",o),n("createBoard",i);case 7:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),deleteBoard:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=r,i=lt.readObject("BOARDS",[]),o=i.findIndex(ut(a)),i.splice(o,1),s=i.map(function(e){e.lists;var t=Object(Ke["a"])(e,["lists"]);return t}),lt.writeObject("BOARDS",s),lt.clear("BOARD_DATA_"+a),n("deleteBoard",{boardId:r});case 9:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),createList:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.getters,a=t.commit,i=n.activeBoardId,o=i+":"+(new Date).getTime().toString(),s=Object(O["a"])({},r,{_id:o}),c=lt.readObject("BOARD_DATA_"+i,[]),c.push(s),lt.writeObject("BOARD_DATA_"+i,c),a("createList",Object(O["a"])({},s,{boardId:i}));case 8:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),deleteList:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.getters,a=t.commit,i=n.activeBoardId,o=lt.readObject("BOARD_DATA_"+i,[]),s=o.findIndex(ut(r)),o.splice(s,1),lt.writeObject("BOARD_DATA_"+i,o),a("deleteList",{listId:r,boardId:i});case 7:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),createListItem:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s,c,l;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=t.getters,i=a.activeBoardId,o=r.listId+":"+(new Date).getTime().toString(),s=lt.readObject("BOARD_DATA_"+i,[]),c=s.find(ut(r.listId)),l=Object(O["a"])({},r.listItem,{_id:o,type:c.type}),Array.isArray(c.list)?c.list.push(l):c.list=[l],lt.writeObject("BOARD_DATA_"+i,s),n("createListItem",Object(O["a"])({},l,{boardId:i,listId:r.listId}));case 9:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),deleteListItem:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a,i,o,s,c,l;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a=t.getters,i=a.activeBoardId,o=r.listId,s=r.listItemId,c=lt.readObject("BOARD_DATA_"+i,[]),l=c.find(ut(o)),l.list.splice(l.list.findIndex(ut(s)),1),lt.writeObject("BOARD_DATA_"+i,c),n("deleteListItem",Object(O["a"])({boardId:i},r));case 8:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}()}),mt=dt,ft=function(e){return function(t){return t._id===e}},pt=function(){var e=lt.readObject("BOARDS",[]);return e.map(function(e){return Object(O["a"])({},e,{lists:[]})})},gt={namespaced:!0,state:{boards:pt()},getters:{boardNames:function(e){return e.boards.map(function(e){return{_id:e._id,boardName:e.boardName}})},activeBoard:function(e,t){return e.boards.find(ft(t.activeBoardId))},activeBoardId:function(e,t,r){return r.route.params.boardId}},mutations:{loadBoard:function(e,t){var r=t.boardId,n=t.data;e.boards.find(ft(r)).lists=n},createBoard:function(e,t){t.err?n["default"].notify(t.err):(e.boards.push(Object(O["a"])({},t,{lists:[]})),n["default"].notify({type:"success",msg:"Created board ".concat(t.boardName)}),It.push({name:"home",params:{boardId:t._id}}))},deleteBoard:function(e,t){if(t.err)n["default"].notify(t.err);else{var r=e.boards.findIndex(ft(t.boardId));n["default"].notify({type:"success",msg:"Board ".concat(e.boards[r].boardName," successfully deleted")}),e.boards.splice(r,1),t.boardId===It.currentRoute.params.boardId&&It.push({name:"home"})}},createList:function(e,t){if(t.err)n["default"].notify(t.err);else{var r=Object(O["a"])({},t);delete r.boardId;var a=e.boards.find(ft(t.boardId));a.lists.push(Object(O["a"])({},r,{list:[]})),n["default"].notify({type:"success",msg:"Created new list in board ".concat(a.boardName)})}},deleteList:function(e,t){if(t.err)n["default"].notify(t.err);else{var r=e.boards.find(ft(t.boardId)),a=r.lists.findIndex(ft(t.listId));n["default"].notify({type:"success",msg:"List ".concat(r.lists[a].header," successfully deleted")}),r.lists.splice(a,1)}},createListItem:function(e,t){if(t.err)n["default"].notify(t.err);else{var r=Object(O["a"])({},t);delete r.listId,delete r.boardId;var a=e.boards.find(ft(t.boardId)),i=a.lists.find(ft(t.listId));i.list.push(r)}},deleteListItem:function(e,t){if(t.err)n["default"].notify(t.err);else{var r=t.listId,a=t.listItemId,i=t.boardId,o=e.boards.find(ft(i)),s=o.lists.find(ft(r)),c=s.list.findIndex(ft(a));s.list.splice(c,1)}}},actions:mt},ht=(function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,n("login",r);case 2:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,n("signUp",r);case 2:case"end":return e.stop()}},e,this)}))}(),function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=t.commit,r("logout");case 2:case"end":return e.stop()}},e,this)}))}(),{login:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,n("login",{err:{type:"error",msg:"Invalid credentials!"}});case 2:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),signUp:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r){var n,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=t.commit,a={fullname:r.fullname,email:r.email},lt.writeObject("user",a),n("signUp",a);case 4:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),logout:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:r=t.commit,lt.clear("user"),r("logout");case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}),bt=ht,vt={namespaced:!0,state:{user:lt.readObject("user")},getters:{isLoggedIn:function(e){return!!e.user&&!!e.user.fullname&&!!e.user.email},fullname:function(e,t){return t.isLoggedIn&&e.user.fullname},email:function(e,t){return t.isLoggedIn&&e.user.email}},mutations:{login:function(e,t){t.err?n["default"].notify(t.err):(e.user={fullname:t.fullname,email:t.email},It.push({name:"home"}))},signUp:function(e,t){t.err?n["default"].notify(t.err):(e.user={fullname:t.fullname,email:t.email},It.push({name:"home"}))},logout:function(e){e.user=null,It.push({name:"login"})}},actions:bt},wt={namespaced:!0,state:{progressVal:0,active:!1,pId:-1,color:"info"},getters:{indeterminate:function(e){return 0===e.progressVal}},mutations:{initProgress:function(e,t){t.pId&&(e.pId=t.pId,e.color=t.type||"info",e.active=!0,e.progressVal=0)},updProgress:function(e,t){var r=this;t.pId===e.pId&&(t.progressVal&&(e.progressVal=t.progressVal),t.type&&(e.color=t.type),e.progressVal>=100&&n["default"].nextTick(function(){setTimeout(function(){return r.commit("progress/resetProgress",{pId:e.pId})},200)}))},resetProgress:function(e,t){e.pId===t.pId&&(e.active=!1,e.color="info",e.progressVal=0,e.pId=-1)}}};n["default"].use(xe["a"]);var yt=new xe["a"].Store({strict:!0,state:{drawer:!0,boardForm:!1,listForm:!1},getters:{},mutations:{setDrawerState:function(e,t){e.drawer=t},setBoardFormState:function(e,t){e.boardForm=t},setListFormState:function(e,t){e.listForm=t}},actions:{},modules:{board:gt,login:vt,progress:wt}});n["default"].use(Ae["a"]);var _t=new Ae["a"]({mode:"history",base:"/TodoBoard/",routes:[{path:"/login",name:"login",component:He},{path:"/:boardId?",name:"home",component:function(){return r.e("home").then(r.bind(null,"bb51"))},meta:{requiresAuth:!0},beforeEnter:function(){var e=Object(x["a"])(regeneratorRuntime.mark(function e(t,r,a){var i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(yt.state.board.boards.some(function(e){return e._id===t.params.boardId})){e.next=6;break}i={name:"home"},yt.state.board.boards.length&&(i.params={boardId:yt.state.board.boards[0]._id}),t.params.boardId?(n["default"].nextTick(function(){return n["default"].notify({type:"error",msg:"The board you are trying to access does not exist."})}),a(i)):i.params?a(i):a(),e.next=9;break;case 6:return e.next=8,yt.dispatch("board/loadBoard",t.params.boardId);case 8:a();case 9:case"end":return e.stop()}},e,this)}));return function(t,r,n){return e.apply(this,arguments)}}()}]});_t.beforeEach(function(e,t,r){e.meta.requiresAuth&&!yt.getters["login/isLoggedIn"]?r({name:"login"}):r()});var It=_t,xt=(r("53f4"),r("31bd"));n["default"].config.productionTip=!1,Object(xt["sync"])(yt,It),new n["default"]({router:It,store:yt,render:function(e){return e(Ne)}}).$mount("#app")},"690a":function(e,t,r){e.exports=r.p+"img/avatar.7c8a344f.png"},"6e0b":function(e,t,r){"use strict";var n=r("a66d"),a=r.n(n);a.a},a66d:function(e,t,r){},a72f:function(e,t,r){e.exports=r.p+"img/guest_avatar.05bf988d.svg"},acc8:function(e,t,r){e.exports=r.p+"img/login_welcome_design.a2b5fb75.png"},b08f:function(e,t,r){},d907:function(e,t,r){e.exports=r.p+"img/gsearch_avatar.09aea0f5.svg"}});
//# sourceMappingURL=app.86d24971.js.map