"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[4393],{4393:(v,c,n)=>{n.r(c),n.d(c,{EditarPerfilPageModule:()=>M});var m=n(177),d=n(4341),o=n(4742),f=n(9384),g=n(467),e=n(4438),P=n(1339),p=n(6340);const h=[{path:"",component:(()=>{var a;class s{constructor(r,i,l,t){this.authService=r,this.firestore=i,this.alertController=l,this.router=t,this.uid=null,this.perfil={username:"",email:"",biografia:"",resenhas:"",interests:[]}}ngOnInit(){this.loadUserProfile()}loadUserProfile(){var r=this;return(0,g.A)(function*(){if(r.uid=yield r.authService.getCurrentUserId(),r.uid)try{const i=yield r.firestore.collection("users").doc(r.uid).get().toPromise();if(i&&i.exists){const l=i.data();l?r.perfil=l:console.error("O documento n\xe3o cont\xe9m dados!")}else console.error("Usu\xe1rio n\xe3o encontrado ou o documento n\xe3o existe!")}catch(i){console.error("Erro ao carregar dados do usu\xe1rio:",i)}})()}salvarPerfil(){var r=this;return(0,g.A)(function*(){if(r.uid)try{yield r.firestore.collection("users").doc(r.uid).update({username:r.perfil.username,email:r.perfil.email,biografia:r.perfil.biografia,resenhas:r.perfil.resenhas,updatedAt:new Date});const i=yield r.alertController.create({header:"Sucesso",message:"Altera\xe7\xf5es salvas com sucesso!",buttons:["OK"]});yield i.present(),yield i.onDidDismiss(),r.router.navigateByUrl("/perfil-usuario")}catch(i){console.error("Erro ao salvar altera\xe7\xf5es:",i)}else console.error("UID n\xe3o est\xe1 definido. N\xe3o \xe9 poss\xedvel salvar as altera\xe7\xf5es.")})()}irParaInteresses(){this.router.navigateByUrl("/interesses")}}return(a=s).\u0275fac=function(r){return new(r||a)(e.rXU(P.u),e.rXU(p.Qe),e.rXU(o.hG),e.rXU(f.Ix))},a.\u0275cmp=e.VBU({type:a,selectors:[["app-editar-perfil"]],decls:29,vars:3,consts:[["slot","start"],["defaultHref","/"],[3,"ngSubmit"],["position","stacked"],["name","username","required","",3,"ngModelChange","ngModel"],["name","email","type","email","required","",3,"ngModelChange","ngModel"],["name","biografia","rows","4",3,"ngModelChange","ngModel"],["expand","full","color","primary",3,"click"],["expand","full","type","submit"]],template:function(r,i){1&r&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",0),e.nrm(3,"ion-back-button",1),e.k0s(),e.j41(4,"ion-title"),e.EFF(5,"Editar Perfil"),e.k0s()()(),e.j41(6,"ion-content")(7,"ion-card")(8,"ion-card-header")(9,"ion-card-title"),e.EFF(10,"Editar Dados"),e.k0s()(),e.j41(11,"ion-card-content")(12,"form",2),e.bIt("ngSubmit",function(){return i.salvarPerfil()}),e.j41(13,"ion-item")(14,"ion-label",3),e.EFF(15,"Nome de Usu\xe1rio"),e.k0s(),e.j41(16,"ion-input",4),e.mxI("ngModelChange",function(t){return e.DH7(i.perfil.username,t)||(i.perfil.username=t),t}),e.k0s()(),e.j41(17,"ion-item")(18,"ion-label",3),e.EFF(19,"Email"),e.k0s(),e.j41(20,"ion-input",5),e.mxI("ngModelChange",function(t){return e.DH7(i.perfil.email,t)||(i.perfil.email=t),t}),e.k0s()(),e.j41(21,"ion-item")(22,"ion-label",3),e.EFF(23,"Biografia"),e.k0s(),e.j41(24,"ion-textarea",6),e.mxI("ngModelChange",function(t){return e.DH7(i.perfil.biografia,t)||(i.perfil.biografia=t),t}),e.k0s()(),e.j41(25,"ion-button",7),e.bIt("click",function(){return i.irParaInteresses()}),e.EFF(26,"Escolher Interesses e Resenhas"),e.k0s(),e.j41(27,"ion-button",8),e.EFF(28,"Salvar Altera\xe7\xf5es"),e.k0s()()()()()),2&r&&(e.R7$(16),e.R50("ngModel",i.perfil.username),e.R7$(4),e.R50("ngModel",i.perfil.email),e.R7$(4),e.R50("ngModel",i.perfil.biografia))},dependencies:[d.qT,d.BC,d.cb,d.YS,d.vS,d.cV,o.Jm,o.QW,o.b_,o.I9,o.ME,o.tN,o.W9,o.eU,o.$w,o.uz,o.he,o.nc,o.BC,o.ai,o.Gw,o.el]}),s})()}];let E=(()=>{var a;class s{}return(a=s).\u0275fac=function(r){return new(r||a)},a.\u0275mod=e.$C({type:a}),a.\u0275inj=e.G2t({imports:[f.iI.forChild(h),f.iI]}),s})(),M=(()=>{var a;class s{}return(a=s).\u0275fac=function(r){return new(r||a)},a.\u0275mod=e.$C({type:a}),a.\u0275inj=e.G2t({imports:[m.MD,d.YN,o.bv,E]}),s})()}}]);