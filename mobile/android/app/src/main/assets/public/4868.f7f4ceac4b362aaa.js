"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4868],{4868:(L,d,a)=>{a.r(d),a.d(d,{LoginPageModule:()=>f});var C=a(177),u=a(4341),i=a(4742),l=a(9384),M=a(467),n=a(4438),m=a(1339);const P=()=>["/esqueceu-senha"],p=()=>["/cadastro-usuario"],h=[{path:"",component:(()=>{var t;class s{constructor(o,e,g,r){this.authService=o,this.toastController=e,this.loadingController=g,this.router=r,this.username="",this.password=""}login(){var o=this;return(0,M.A)(function*(){const e=yield o.loadingController.create({message:"Carregando..."});yield e.present();try{const g=yield o.authService.loginWithUsername(o.username,o.password);yield e.dismiss(),g?(o.showToast("Login bem-sucedido"),o.router.navigate(["tabs/match"])):o.showToast("Nome de usu\xe1rio ou senha incorretos.")}catch{yield e.dismiss(),o.showToast("Erro ao tentar login. Tente novamente.")}})()}showToast(o){var e=this;return(0,M.A)(function*(){(yield e.toastController.create({message:o,duration:2e3})).present()})()}}return(t=s).\u0275fac=function(o){return new(o||t)(n.rXU(m.u),n.rXU(i.K_),n.rXU(i.Xi),n.rXU(l.Ix))},t.\u0275cmp=n.VBU({type:t,selectors:[["app-login"]],decls:25,vars:6,consts:[[1,"ion-padding"],["position","floating"],["type","text",3,"ngModelChange","ngModel"],["type","password",3,"ngModelChange","ngModel"],["expand","full",3,"click"],[1,"forgot-password-link"],[3,"routerLink"],[1,"register-link"]],template:function(o,e){1&o&&(n.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),n.EFF(3,"Login"),n.k0s()()(),n.j41(4,"ion-content",0)(5,"ion-item")(6,"ion-label",1),n.EFF(7,"Usuario"),n.k0s(),n.j41(8,"ion-input",2),n.mxI("ngModelChange",function(r){return n.DH7(e.username,r)||(e.username=r),r}),n.k0s()(),n.j41(9,"ion-item")(10,"ion-label",1),n.EFF(11,"Senha"),n.k0s(),n.j41(12,"ion-input",3),n.mxI("ngModelChange",function(r){return n.DH7(e.password,r)||(e.password=r),r}),n.k0s()(),n.j41(13,"ion-button",4),n.bIt("click",function(){return e.login()}),n.EFF(14,"Login"),n.k0s(),n.j41(15,"div",5)(16,"ion-text"),n.EFF(17,"Esqueceu a senha? "),n.j41(18,"ion-router-link",6),n.EFF(19,"Redefinir senha."),n.k0s()()(),n.j41(20,"div",7)(21,"ion-text"),n.EFF(22,"J\xe1 possui cadastro?"),n.j41(23,"ion-router-link",6),n.EFF(24,"Cadastre-se"),n.k0s()()()()),2&o&&(n.R7$(8),n.R50("ngModel",e.username),n.R7$(4),n.R50("ngModel",e.password),n.R7$(6),n.Y8G("routerLink",n.lJ4(4,P)),n.R7$(5),n.Y8G("routerLink",n.lJ4(5,p)))},dependencies:[u.BC,u.vS,i.Jm,i.W9,i.eU,i.$w,i.uz,i.he,i.IO,i.BC,i.ai,i.Gw,i.N7,l.Wk],styles:[".login-container[_ngcontent-%COMP%], .cadastro-container[_ngcontent-%COMP%], .idiomas-container[_ngcontent-%COMP%], .interesses-container[_ngcontent-%COMP%]{padding:20px}.login-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%], .cadastro-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%], .idiomas-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%], .interesses-container[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{margin-bottom:15px}.login-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%], .cadastro-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%], .idiomas-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%], .interesses-container[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--background: #007bff;--color: white;margin-top:20px}.login-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .cadastro-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .idiomas-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .interesses-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#007bff;text-align:center;display:block;margin-top:10px}.register-link[_ngcontent-%COMP%]{margin-top:20px;text-align:center}"]}),s})()}];let O=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[l.iI.forChild(h),l.iI]}),s})(),f=(()=>{var t;class s{}return(t=s).\u0275fac=function(o){return new(o||t)},t.\u0275mod=n.$C({type:t}),t.\u0275inj=n.G2t({imports:[C.MD,u.YN,i.bv,O]}),s})()}}]);