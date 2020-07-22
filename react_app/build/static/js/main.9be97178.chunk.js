(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{18:function(e,t,a){},29:function(e,t,a){e.exports=a(43)},34:function(e,t,a){},41:function(e,t,a){},43:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(20),c=a.n(o),l=a(2),s=a(11),i=a(3);a(34);var u=function(e){return r.a.createElement("input",{className:"input-field",onChange:e.onChangeHandler,type:e.type,placeholder:e.placeholderMessage,value:e.value})},m=(a(18),{borderColor:"#30c784",color:"green"}),d={color:"red",padding:"5px 10px",animation:"fadeIn ease 0.3s"};var g=function(e){return r.a.createElement("p",{className:"message",style:"ok"!==e.condition?d:m},"ok"!==e.condition?e.errorMessageText:e.successMessageText)},f=a(21),p=a(22),h=new(function(){function e(){Object(f.a)(this,e),this.status=""}return Object(p.a)(e,[{key:"authenticate",value:function(e,t,a){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;console.log("logging in"),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({identifier:e,password:t})}).then((function(e){if(200===e.status)return e.json()})).then((function(e){e?(localStorage.setItem("access_token",e.access_token),localStorage.setItem("refresh_token",e.refresh_token),localStorage.setItem("user","testuser"),localStorage.setItem("isLoggedIn",!0),a("ok")):a(n)}))}},{key:"isLoggedIn",value:function(){var e=this,t=localStorage.getItem("refresh_token");return t?(fetch("/api/refresh",{method:"GET",headers:{Authorization:"Bearer ".concat(t)}}).then((function(t){if(200===t.status)return t.json();console.log("redirect to login"),e.status=!1})).then((function(t){t?(localStorage.setItem("access_token",t.access_token),console.log("isLoggedIn"),e.status=!0):(console.log("redirect to login"),e.status=!1)})),this.status):(console.log("logged out"),!1)}},{key:"register",value:function(e,t,a,n,r){console.log("logging in"),fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,email:t,password:a})}).then((function(e){if(201===e.status)return e.json()})).then((function(e){e?n("ok"):(n("error"),r("error on register"))}))}}]),e}());var v=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(""),s=Object(i.a)(c,2),m=s[0],d=s[1],f=Object(n.useState)(""),p=Object(i.a)(f,2),v=p[0],E=p[1];return r.a.createElement("div",{className:"form-container"},r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"login-form"},"ok"!==v?r.a.createElement(g,{errorMessageText:v,condition:v}):r.a.createElement(l.a,{to:"/all"}),r.a.createElement(u,{type:"identifier",placeholderMessage:"email or username",onChangeHandler:function(e){var t=e.target.value;o(t)},value:a,required:!0}),r.a.createElement(u,{type:"password",placeholderMessage:"password",onChangeHandler:function(e){var t=e.target.value;d(t)},value:m,required:!0}),r.a.createElement("button",{type:"submit",className:"action-button",onClick:function(){a&&m?h.authenticate(a,m,E,"Invalid Credentials"):E("Please fill in all the fields")}}," SIGN IN"))))};var E=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)(""),l=Object(i.a)(c,2),s=l[0],m=l[1],d=Object(n.useState)(""),f=Object(i.a)(d,2),p=f[0],v=f[1],E=Object(n.useState)(""),b=Object(i.a)(E,2),y=b[0],k=b[1],S=Object(n.useState)(""),j=Object(i.a)(S,2),x=j[0],N=j[1],O=Object(n.useState)(""),C=Object(i.a)(O,2),w=C[0],I=C[1];return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:function(e){return e.preventDefault()}},r.a.createElement("div",{className:"login-form"},"error"===x?r.a.createElement(g,{errorMessageText:w,condition:x}):r.a.createElement(g,{successMessageText:"Successfully created your account !",condition:x}),r.a.createElement(u,{type:"mail",placeholderMessage:"mail",onChangeHandler:function(e){var t=e.target.value;o(t)},value:a,required:!0}),r.a.createElement(u,{type:"username",placeholderMessage:"username",onChangeHandler:function(e){var t=e.target.value;m(t)},value:s,required:!0}),r.a.createElement(u,{type:"password",placeholderMessage:"password",onChangeHandler:function(e){var t=e.target.value;v(t)},value:p,required:!0}),r.a.createElement(u,{type:"password",placeholderMessage:"confirm password",onChangeHandler:function(e){var t=e.target.value;k(t)},value:y,required:!0}),r.a.createElement("button",{type:"submit",className:"action-button",onClick:function(){a&&p&&y?p!==y?(N("error"),I("Passwords are not matching")):h.register(s,a,p,N,I):I("Please fill in all the fields")}}," REGISTER "))))};var b=function(e){return r.a.createElement("div",{className:"course-item"},r.a.createElement("p",{class:"course-item-title"},e.title),r.a.createElement("p",{class:"course-item-link"},e.link),r.a.createElement("p",{class:"course-item-category"},e.category),r.a.createElement("p",{class:"course-item-author"},e.author))};var y=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),a=t[0],o=t[1];return Object(n.useEffect)((function(){fetch("/api/course").then((function(e){return e.json()})).then((function(e){return o(e.courses)}))}),[]),r.a.createElement("div",{className:"course-list"},a.map((function(e){return r.a.createElement(b,{key:e.id,id:e.id,title:e.title,category:e.category,link:e.link,author:e.author})})))};var k=function(e){return r.a.createElement(s.b,{to:e.pathLink,style:{textDecoration:"none"},onMouseEnter:function(e){return e.currentTarget.style.backgroundColor="#353b3d"},onMouseLeave:function(e){return e.currentTarget.style.background="transparent"}},r.a.createElement("div",{style:{display:"flex",justifyContent:"left",alignItems:"center",backgroundColor:"transparent"}},e.icon,"open"===e.navbarStatus?r.a.createElement("p",{style:{color:"white",textDecoration:"none",textDecorationColor:"white",fontSize:"0.8rem",padding:"12px 20px",backgroundColor:"transparent"}}," ",e.name," "):void 0))},S=a(26),j=a.n(S),x=a(25),N=a.n(x),O=a(27),C=a.n(O),w=a(23),I=a.n(w),T=a(24),M=a.n(T);var H=function(){var e=Object(n.useState)("closed"),t=Object(i.a)(e,2),a=t[0],o=t[1];return r.a.createElement("div",{style:"open"===a?{width:"180px"}:{width:"60px"},className:"navbar"},r.a.createElement(s.b,{to:"#",style:{backgroundColor:"#185a9d",textDecoration:"none",height:"54px"},onClick:function(){o("open"===a?"closed":"open")}},"closed"===a?r.a.createElement("div",{style:{overflow:"visible"}},r.a.createElement(I.a,{className:"navbar-icon"})):r.a.createElement("div",{style:{display:"flex",alignItems:"center",backgroundColor:"#185a9d"}},r.a.createElement(M.a,{className:"navbar-icon"}))),r.a.createElement(k,{className:"navbar-icon",pathLink:"/home",name:"Home",navbarStatus:a,icon:r.a.createElement(N.a,{className:"navbar-icon"})}),r.a.createElement(k,{className:"navbar-icon",pathLink:"/all",name:"Find Tracks",navbarStatus:a,icon:r.a.createElement(j.a,{className:"navbar-icon"})}),r.a.createElement(k,{className:"navbar-icon",pathLink:"/personal",name:"My Tracks",navbarStatus:a,icon:r.a.createElement(C.a,{className:"navbar-icon"})}))},L={width:"100vw",height:"54px",backgroundColor:"#185a9d",position:"fixed",top:0,left:"60px",right:0,textAlign:"left",zIndex:3};var D=function(){return r.a.createElement("div",{style:L},r.a.createElement("a",{style:{textDecoration:"none"},href:"/home"},r.a.createElement("h1",{style:{fontSize:"1rem",position:"relative",left:"10px",top:"18px",color:"white",zIndex:3}}," PathFinder")))};var P=function(){return r.a.createElement("div",null,r.a.createElement(D,null),r.a.createElement(H,null))};a(41);var _=function(){var e=Object(n.useState)("login"),t=Object(i.a)(e,2),a=t[0],o=t[1],c={backgroundImage:"linear-gradient(to right, rgb(81, 180, 180),rgb(140, 204, 212))",color:"white"};function l(e){var t=e.target.value;o(t)}return r.a.createElement("div",{className:"landing-container-bckg"},r.a.createElement("div",{className:"landing-container-main"},r.a.createElement("div",{className:"landing-container-left"},r.a.createElement("h1",{style:{fontSize:"3rem"}},"PathFinder"),r.a.createElement("br",null),r.a.createElement("h2",null,"Start your journey")),r.a.createElement("div",{className:"landing-container-right"},r.a.createElement("div",{className:"landing-container-right-formswitch"},r.a.createElement("button",{className:"formswitch",value:"login",onClick:l,style:"login"===a?c:null}," Sign In "),r.a.createElement("button",{className:"formswitch",value:"register",onClick:l,style:"register"===a?c:null}," Register ")),r.a.createElement("h1",{style:{color:"teal",marginTop:"2rem",fontFamily:"Ubuntu, sans-serif"}},"login"===a?"Welcome Back!":"Join Us!"),"login"===a?r.a.createElement(v,null):r.a.createElement(E,null))))};var q=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(s.a,null,r.a.createElement(l.d,null,r.a.createElement(l.b,{exact:!0,path:"/",component:_}),r.a.createElement(l.b,{exact:!0,path:"/login",component:v}),r.a.createElement(l.b,{exact:!0,path:"/register",component:E}),r.a.createElement(l.b,{component:function(){return r.a.createElement("div",null,r.a.createElement(P,null),r.a.createElement(l.b,{path:"/all",component:y}))}}))))};c.a.render(r.a.createElement(q,null),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.9be97178.chunk.js.map