(this["webpackJsonptest-vdt-app"]=this["webpackJsonptest-vdt-app"]||[]).push([[0],{457:function(e,t,a){},459:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(29),i=a.n(c),o=a(218),s=a(460),d=a(461),l=a(159),j=a(283),h=a.n(j),u=(a(261),a(377),Object(l.a)({typography:{useNextVariants:!0,fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'},palette:{type:"light",primary:{light:"#222",main:"#111",dark:"#000"},secondary:{light:"#DDD",main:"#CCC",dark:"#BBB"},text:{primary:"rgba(0,0,0,0.75)"},background:{login:"linear-gradient(-45deg,#b0c800,#0068a9 0,#0068a9 33%,#002749 100%,#b0c800 0)"}},overrides:{VdtUserAvatarButton:{avatar:{backgroundColor:h.a[500],fontSize:"0.875rem",height:32,width:32}}},props:{VdtUserAvatarButton:{locale:{options:void 0},userName:""}}})),b=a(56),x=a(42),O=a(3),f=a(13),p=a(284),m=a(129),g=a(563),v=a(6),C=a(7),S=r.a.createContext();var L=function(e){var t=e.children,a=Object(g.a)(["storages"],(function(){return v.s.listStorage({}).then((function(e){var t=e.data;return function(e){var t=null,a=null;return e.storage.forEach((function(e){e.metadata.field&&e.metadata.field.forEach((function(n){"transcodeThemeSourceStorage"===n.key&&(t=e.id),"transcodeThemeOutputStorage"===n.key&&(a=e.id)}))})),{sourceStorage:t,outputStorage:a}}(void 0===t?{}:t)}))}),{refetchOnWindowFocus:!1,staleTime:1/0}),n=a.data,r=a.isLoading,c=a.isError;return Object(C.jsx)(S.Provider,{value:Object(m.a)(Object(m.a)({},n),{},{isLoading:r,isError:c}),children:t})},y=a.p+"static/media/logo.db253c2c.svg",N=a.p+"static/media/header-logo.f0892ea4.svg",k=y,w=N,T="<VDT TEMPLATE>";document.title="<VDT TEMPLATE>";var E="https://github.com/vidispine/transcode_theme";E&&E.startsWith("http")&&(E=(E=new URL(E)).pathname.replace(/(.+?)\/+$/,"$1"));var A=E,I=a(206),P=a(142),F=a(203),M=a(248),R=a(77),D=a(471),B=a(25),V=a(208),W=a(11),U=a(59),z=a(39),H=a(558),q=a(559),J=a(135),$=a.n(J),_=a(330),G=a.n(_);var K=function(e){var t=e.shape,a=e.file;if(!t)return Object(C.jsx)("p",{children:"Technical metadata extraction not completed."});var n=t.containerComponent,r=t.videoComponent,c=t.audioComponent,i=(n&&n.mediaInfo.property.find((function(e){return"Duration"===e.key}))||{}).value,o=c?c.length:0,s=c?c.reduce((function(e,t){return e+Number(t.channelCount)}),0):0;return Object(C.jsx)(C.Fragment,{children:Object(C.jsxs)("ul",{children:[n&&n.format&&Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Container format:"})," ",n&&n.format," "]}),r&&r[0].codec&&Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Video codec: "})," ",r&&r[0].codec]}),c&&c[0].codec&&Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Audio codec: "})," ",c&&c[0].codec]}),c&&Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Audio configuration:"})," ",o," tracks and ",s," channels"]}),i&&Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Duration: "})," ",G()(Number(i||0))]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("b",{children:"Timestamp: "})," ",a.timestamp]})]})})},Q=function(e){var t=Object(f.k)(v.f.listFileStorage),a=t.data,n=t.request;return{onSearch:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return n({storageId:e,queryParams:{number:10,sort:"fileId desc",path:"*".concat(t,"*"),prefix:!0,wildcard:!0,first:a}})},fileListType:a,isLoading:t.isLoading,hasLoaded:t.hasLoaded}},X=function(){var e=Object(n.useState)({fileShapes:{},hasShapesLoaded:!1}),t=Object(b.a)(e,2),a=t[0],r=t[1],c=function(e){r((function(t){return Object(m.a)(Object(m.a)({},t),{},{hasLoaded:e})}))};return Object(m.a)({onListShapes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];c(!1);var t=[];e.forEach((function(e){t.push(v.f.listFileShapes({fileId:e}))})),Promise.all(t).then((function(e){return e.map((function(e){return e.json()}))})).then((function(t){var a={};t.forEach((function(t,n){a[e[n]]=t.shape?t.shape[0]:{}})),r({hasShapesLoaded:!0,fileShapes:a})}))}},a)},Y=function(e){var t=e.selected,a=e.onSelect,n=e.file,r=e.transcodeAvailable,c=e.openTranscodeModal;return Object(C.jsxs)(D.a,{disableSpacing:!0,style:{padding:0},children:[r&&Object(C.jsx)(B.a,{onClick:function(){return c(n)},children:Object(C.jsx)(H.a,{})}),Object(C.jsx)(B.a,{children:Object(C.jsx)(q.a,{})}),Object(C.jsx)(V.a,{checked:t,onChange:a})]})},Z=function(e){var t=e.classes,a=e.storageId,r=e.transcodeAvailable,c=e.openTranscodeModal,i=Q(a),o=i.onSearch,s=i.fileListType,d=i.hasLoaded,l=i.isLoading,j=X(),h=j.onListShapes,u=j.hasShapesLoaded,x=j.fileShapes,O=Object(n.useState)(0),f=Object(b.a)(O,2),p=f[0],m=f[1],g=Object(n.useState)(""),v=Object(b.a)(g,2),S=v[0],L=v[1],y=(d?s:{}).file,N=void 0===y?[]:y;Object(n.useEffect)((function(){d&&h(N.map((function(e){return e.id})))}),[N]),Object(n.useEffect)((function(){o(S,p)}),[p]);var k=function(e){return u&&x[e.id]&&0!==Object.keys(x[e.id]).length?Object(C.jsx)(K,{file:e,shape:x[e.id]}):Object(C.jsx)("p",{children:"Technical metadata extraction not completed."})};return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(R.c,{className:t.SearchInput,onSubmit:o,submitting:d&&l,onChange:L}),Object(C.jsx)(W.a,{onClick:function(){m(Math.max(0,p-10))},children:"Previous"}),Object(C.jsx)(W.a,{onClick:function(){m(p+10)},children:"Next"}),Object(C.jsx)(U.a,{children:N.map((function(e){return Object(C.jsx)(z.a,{children:Object(C.jsx)(R.b,{className:"search-result",title:e.path,subheader:$()(e.size),ExpandComponent:!1,content:k(e),ContentProps:{component:"div"},ActionsComponent:Y,ActionsProps:{transcodeAvailable:r,openTranscodeModal:c,file:{file:e,fileShape:u?x[e.id]:{}}}},e.id)},e.id)}))})]})},ee=a(40),te=a(16),ae=a(61),ne=a(49),re=a(44),ce=a(70),ie=a(48),oe=a(51),se=r.a.createContext();var de=function(e){var t={},a=e.name,n=e.format,r=e.video,c=e.audio,i=e.metadata;if(a&&(t.name=a),n&&(t.format=n),r){var o=r.codec,s=r.bitrate,d=r.scaling,l=r.framerate;if(o&&(t.videoCodec=o),s&&(t.bitrate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=["Kb/s","Mb/s"],a=parseInt(Math.floor(Math.log(e)/Math.log(1024e4)),10);return"".concat((e/Math.pow(1e3,a+1)).toFixed(0)," ").concat(t[a])}(s)),d){var j=d.width,h=d.height;j&&h&&(t.resolution="".concat(j," x ").concat(h)),j&&(t.width=j),h&&(t.height=h)}if(l){var u=r.denominator,b=void 0===u?1:u,x=r.numerator,O=void 0===x?1:x;t.framerate=b/O}}if(c){var f=c.codec;f&&(t.audioCodec=f)}return i&&(t.metadata=i),t};function le(e){var t=e.tagName;return Object(g.a)(["profile",t],(function(){return v.r.getShapeTag({tagName:t}).then((function(e){var t=e.data;return de(void 0===t?{}:t)}))}),{refetchOnWindowFocus:!1,staleTime:1/0})}var je=function(e){var t=e.children,a=Object(g.a)(["profile"],(function(){return v.r.listShapeTag().then((function(e){var t=e.data,a=(void 0===t?{}:t).uri;return void 0===a?[]:a}))}),{refetchOnWindowFocus:!1,staleTime:1/0}),n=a.data,c=void 0===n?[]:n,i=a.isLoading,o=a.isError,s=r.a.useState(""),d=Object(b.a)(s,2),l=d[0],j=d[1],h=r.a.useMemo((function(){return c.filter((function(e){return e.toLowerCase().includes(l)}))}),[l,c]);return Object(C.jsx)(se.Provider,{value:{profiles:h,onSearch:function(e){return j(e)},isLoading:i,isError:o},children:t})};function he(){var e=r.a.useContext(se);if(void 0===e)throw new Error("useProfile must be used within a ProfileProvider");return e}var ue=function(e){var t=le({tagName:e.profile}).data,a=void 0===t?{}:t,n=a.name,r=a.resolution,c=a.videoCodec,i=a.bitrate,o=a.audioCodec;return Object(C.jsxs)(ee.a,{children:[Object(C.jsx)(te.a,{padding:"checkbox",children:Object(C.jsx)(V.a,{})}),Object(C.jsx)(te.a,{children:n}),Object(C.jsxs)(te.a,{children:["Codec: ",c]}),Object(C.jsxs)(te.a,{children:["Audio codec: ",o]}),Object(C.jsxs)(te.a,{children:["Resolution: ",r]}),Object(C.jsxs)(te.a,{children:["Bitrate: ",i]})]})},be=function(e){return e.fileShape?Object(C.jsx)(K,{file:e.file,shape:e.fileShape}):Object(C.jsx)("p",{children:"Technical metadata extraction not completed."})},xe=function(e){var t=e.open,a=e.fileInfo,n=e.handleClose,r=he().profiles,c=void 0===r?[]:r;return Object(C.jsxs)(ae.a,{fullWidth:!1,maxWidth:"md",open:t,onClose:function(){},"aria-labelledby":"max-width-dialog-title",children:[Object(C.jsxs)(ne.a,{id:"max-width-dialog-title",children:["Transcode file ",a?a.file.id:""]}),Object(C.jsxs)(re.a,{children:[a&&Object(C.jsx)(R.b,{className:"search-result",title:a.file.path,subheader:$()(a.file.size),ExpandComponent:!1,content:be(a),ContentProps:{component:"div"},ActionsComponent:!1}),Object(C.jsx)("h2",{children:"Profiles"}),Object(C.jsx)(ce.a,{children:Object(C.jsx)(ie.a,{children:c.map((function(e){return Object(C.jsx)(ue,{profile:e},e)}))})})]}),Object(C.jsxs)(oe.a,{children:[Object(C.jsx)(W.a,{onClick:n,color:"primary",children:"Close"}),Object(C.jsx)(W.a,{onClick:function(){},color:"primary",children:"Next"})]})]})};a(457);var Oe=Object(O.a)((function(e){return{root:{paddingTop:e.spacing(2),paddingBottom:e.spacing(2),paddingLeft:e.spacing(4),paddingRight:e.spacing(4)},ItemList:{},SearchInput:{}}}))((function(e){var t=e.classes,a=r.a.useState("source"),n=Object(b.a)(a,2),c=n[0],i=n[1],o=r.a.useState(),s=Object(b.a)(o,2),d=s[0],l=s[1],j=r.a.useState(!1),h=Object(b.a)(j,2),u=h[0],x=h[1],O=r.a.useContext(S),f=O.sourceStorage,p=O.outputStorage,m=O.isLoading;return Object(C.jsxs)("div",{className:t.root,children:[Object(C.jsxs)(I.a,{value:c,onChange:function(e,t){return t&&i(t)},children:[Object(C.jsx)(P.a,{value:"source",label:"Source"}),Object(C.jsx)(P.a,{value:"output",label:"Output"})]}),{source:Object(C.jsx)(F.a,{variant:"outlined",children:!m&&Object(C.jsx)(M.a,{children:Object(C.jsx)(Z,{classes:t,storageId:f,openTranscodeModal:function(e){l(e),x(!0)},transcodeAvailable:!0})})},"source"),output:Object(C.jsx)(F.a,{variant:"outlined",children:!m&&Object(C.jsx)(M.a,{children:Object(C.jsx)(Z,{classes:t,storageId:p,transcodeAvailable:!1})})},"output")}[c],Object(C.jsx)(xe,{fileInfo:d,open:u,handleClose:function(){x(!1)}})]})})),fe=a(21),pe=a(97),me=function(e){var t=le({tagName:e.profile}).data,a=void 0===t?{}:t;console.log(a);var n=a.name,r=a.format,c=a.resolution,i=a.videoCodec,o=a.bitrate,s=a.audioCodec,d=a.framerate;return Object(C.jsxs)(ee.a,{children:[Object(C.jsx)(te.a,{padding:"checkbox",children:Object(C.jsx)(V.a,{})}),Object(C.jsx)(te.a,{children:n}),Object(C.jsx)(te.a,{children:r}),Object(C.jsx)(te.a,{children:c}),Object(C.jsx)(te.a,{children:d}),Object(C.jsx)(te.a,{children:i}),Object(C.jsx)(te.a,{children:s}),Object(C.jsx)(te.a,{children:o})]})},ge=function(){var e=Object(n.useState)(0),t=Object(b.a)(e,2),a=t[0],r=t[1],c=he(),i=c.profiles,o=void 0===i?[]:i,s=c.onSearch;return Object(C.jsxs)(fe.a,{height:500,children:[Object(C.jsx)(R.c,{onSubmit:s}),Object(C.jsx)(W.a,{type:"button",onClick:function(){r(Math.max(0,a-20))},disabled:0===a,children:"Prev"}),Object(C.jsx)(W.a,{type:"button",onClick:function(){r(a+20)},disabled:a+20>o.length,children:"Next"}),Object(C.jsxs)(ce.a,{children:[Object(C.jsx)(pe.a,{children:Object(C.jsxs)(ee.a,{children:[Object(C.jsx)(te.a,{}),Object(C.jsx)(te.a,{children:"Name"}),Object(C.jsx)(te.a,{children:"Format"}),Object(C.jsx)(te.a,{children:"Resolution"}),Object(C.jsx)(te.a,{children:"Framerate"}),Object(C.jsx)(te.a,{children:"Video codec"}),Object(C.jsx)(te.a,{children:"Audio codec"}),Object(C.jsx)(te.a,{children:"Bitrate"})]})}),Object(C.jsx)(ie.a,{children:o.slice(a,a+20).map((function(e){return Object(C.jsx)(me,{profile:e},e)}))})]})]})},ve=a(15),Ce=a(100),Se=a(207);var Le=Object(O.a)((function(e){return{root:{height:"100vh",width:"100vw"},gridLeft:{padding:e.spacing(4)},gridRight:{height:"inherit",display:"flex",justifyContent:"center",alignItems:"center",background:e.palette.background.login},logo:{backgroundColor:e.palette.common.white,maxWidth:"25vw"}}}))((function(e){var t=e.classes,a=e.onLogin,n=e.userName,r=e.serverUrl,c=e.error;return Object(C.jsxs)(ve.a,{className:t.root,container:!0,direction:"row",alignItems:"center",children:[Object(C.jsxs)(ve.a,{item:!0,xs:12,sm:12,md:6,lg:3,className:t.gridLeft,children:[Object(C.jsx)(Se.a,{style:{visibility:c?"visible":"hidden"},severity:"error",className:t.alert,children:c}),Object(C.jsx)(R.a,{onSubmit:a,FormProps:{initialValues:{userName:n,serverUrl:r}},UrlFieldComponent:null,RememberMeFieldComponent:null})]}),Object(C.jsx)(Ce.a,{smDown:!0,children:Object(C.jsx)(ve.a,{item:!0,sm:!0,className:t.gridRight,children:Object(C.jsx)("img",{src:k,alt:T,className:t.logo})})})]})})),ye=a(23);var Ne=Object(O.a)((function(){return{logo:{text:"100%",textAlign:"center"}}}))((function(e){var t=e.classes;return Object(C.jsx)(ye.a,{className:t.text,children:"Page does not exist"})})),ke=a(466),we=a(336);var Te=Object(O.a)((function(e){return{logo:{height:"calc(".concat(e.mixins.toolbar.minHeight,"px - ").concat(e.spacing(4),"px)"),marginRight:e.spacing(4)},title:{flexGrow:1}}}))((function(e){var t=e.classes,a=Object(f.l)(),n=a.userName,r=a.onLogout;return Object(C.jsx)(ke.a,{elevation:0,children:Object(C.jsxs)(we.a,{variant:"dense",children:[Object(C.jsx)("img",{className:t.logo,src:w,alt:T}),Object(C.jsx)("div",{className:t.title,children:T}),Object(C.jsx)(R.d,{userName:n,onLogout:r})]})})})),Ee=new(a(561).a);var Ae=Object(O.a)((function(e){return{container:{height:"100vh",overflow:"auto",paddingTop:e.mixins.toolbar.minHeight,marginRight:e.spacing(1),marginLeft:e.spacing(1)}}}))((function(e){var t=e.classes,a=r.a.useState("VIDISPINE_URL is unset"),n=Object(b.a)(a,2),c=n[0],i=n[1];return Object(C.jsx)(f.a,{cookieOptions:{maxAge:1209600,path:A},onError:function(e){var t=e.message;i(t),setTimeout((function(){return i()}),5e3)},LoginComponent:Le,LoginProps:{error:c},serverUrl:"/",children:Object(C.jsx)(p.a,{client:Ee,children:Object(C.jsx)(L,{children:Object(C.jsxs)(je,{children:[Object(C.jsx)(Te,{}),Object(C.jsx)("div",{className:t.container,children:Object(C.jsxs)(x.d,{children:[Object(C.jsx)(x.b,{exact:!0,path:"/search/",children:Object(C.jsx)(Oe,{})}),Object(C.jsx)(x.b,{exact:!0,path:"/search/*",children:Object(C.jsx)(Oe,{})}),Object(C.jsx)(x.b,{exact:!0,path:"/profile/",children:Object(C.jsx)(ge,{})}),Object(C.jsx)(x.a,{exact:!0,from:"/",push:!0,to:"/search/"}),Object(C.jsx)(x.b,{path:"*",children:Object(C.jsx)(Ne,{})})]})})]})})})})})),Ie=a(331),Pe=a(332),Fe=a(335),Me=a(334),Re=a(560),De=a(121),Be=function(e){Object(Fe.a)(a,e);var t=Object(Me.a)(a);function a(e){var n;return Object(Ie.a)(this,a),(n=t.call(this,e)).state={hasError:!1},n}return Object(Pe.a)(a,[{key:"render",value:function(){var e=this.props.children,t=this.state,a=t.hasError,n=t.error;return a?Object(C.jsx)(Re.a,{maxWidth:"sm",children:Object(C.jsxs)(De.a,{variant:"outlined",style:{backgroundColor:"#313131",color:"#eee",padding:"8px 16px 32px 16px"},children:[Object(C.jsx)("h3",{children:"We're sorry - something went wrong: "}),n&&Object(C.jsx)("div",{style:{color:"#e57373"},children:n.toString()})]})}):e}}],[{key:"getDerivedStateFromError",value:function(e){return{error:e,hasError:!0}}}]),a}(r.a.Component);i.a.render(Object(C.jsx)(Be,{children:Object(C.jsx)(s.a,{theme:u,children:Object(C.jsx)(d.a,{children:Object(C.jsx)(o.a,{basename:A,children:Object(C.jsx)(Ae,{})})})})}),document.getElementById("root"))}},[[459,1,2]]]);