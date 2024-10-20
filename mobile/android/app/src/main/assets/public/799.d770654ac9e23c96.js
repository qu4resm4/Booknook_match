"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[799],{799:(k,d,a)=>{a.r(d),a.d(d,{HomePageModule:()=>y});var f=a(177),m=a(4341),s=a(791),c=a(8986),p=a(467),e=a(3953),g=a(1626);let u=(()=>{var n;class i{constructor(t){this.http=t,this.API_URL="../../../assets/json/perfis.json"}getPerfis(){return this.http.get(this.API_URL)}}return(n=i).\u0275fac=function(t){return new(t||n)(e.KVO(g.Qq))},n.\u0275prov=e.jDH({token:n,factory:n.\u0275fac,providedIn:"root"}),i})();const P=["swipeCard"];let h=(()=>{var n;class i{constructor(t){this.gestureCtrl=t}ngAfterViewInit(){this.createSwipeGesture()}createSwipeGesture(){this.gestureCtrl.create({el:this.swipeCard.nativeElement,gestureName:"swipe-card",onMove:o=>this.onMove(o),onEnd:o=>this.onEnd(o)}).enable(!0)}onMove(t){const o=this.swipeCard.nativeElement;o.style.transform=`translateX(${t.deltaX}px) rotate(${t.deltaX/20}deg)`,t.deltaX>100?o.classList.add("like-animation"):t.deltaX<-100?o.classList.add("dislike-animation"):o.classList.remove("like-animation","dislike-animation")}onEnd(t){const o=this.swipeCard.nativeElement;t.deltaX>150?(o.style.transition="0.5s ease-out",o.style.transform=`translateX(1000px) rotate(${t.deltaX/20}deg)`,o.remove()):t.deltaX<-150?(o.style.transition="0.5s ease-out",o.style.transform=`translateX(-1000px) rotate(${t.deltaX/20}deg)`,o.remove()):(o.style.transition="0.3s ease-out",o.style.transform="translateX(0px) rotate(0deg)",o.classList.remove("like-animation","dislike-animation"))}resetCard(){const t=this.swipeCard.nativeElement;t.style.transition="",t.style.transform="",t.classList.remove("like-animation","dislike-animation")}}return(n=i).\u0275fac=function(t){return new(t||n)(e.rXU(s.wH))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-perfilmodal"]],viewQuery:function(t,o){if(1&t&&e.GBs(P,7,e.aKT),2&t){let l;e.mGM(l=e.lsd())&&(o.swipeCard=l.first)}},inputs:{perfis:"perfis"},decls:23,vars:3,consts:[["swipeCard",""],["vertical","top","horizontal","start","slot","fixed"],["size","small","color","danger"],["name","alert-circle"],[1,"description-container"],[1,"description-text"],[1,"info-section"],["name","language",1,"info-icon"],[1,"info-label"],["name","book-outline",1,"info-icon"]],template:function(t,o){1&t&&(e.j41(0,"ion-card",null,0)(2,"ion-card-content")(3,"ion-fab",1)(4,"ion-fab-button",2),e.nrm(5,"ion-icon",3),e.k0s()()(),e.j41(6,"ion-card-content")(7,"div",4)(8,"ion-text")(9,"p",5),e.EFF(10),e.k0s()()(),e.j41(11,"div",6),e.nrm(12,"ion-icon",7),e.j41(13,"ion-label",8)(14,"strong"),e.EFF(15,"Idiomas:"),e.k0s(),e.EFF(16),e.k0s()(),e.j41(17,"div",6),e.nrm(18,"ion-icon",9),e.j41(19,"ion-label",8)(20,"strong"),e.EFF(21,"Categorias:"),e.k0s(),e.EFF(22),e.k0s()()()()),2&t&&(e.R7$(10),e.SpI(" ",o.perfis.descricao," "),e.R7$(6),e.SpI("",o.perfis.idiomas," "),e.R7$(6),e.SpI("",o.perfis.categorias," "))},dependencies:[s.b_,s.I9,s.Q8,s.YW,s.iq,s.he,s.IO],styles:['ion-card[_ngcontent-%COMP%]{height:50vh;border-radius:16px;box-shadow:0 4px 8px #0000001a;margin:16px;position:relative;transition:transform .5s ease-out;will-change:transform}ion-card-content[_ngcontent-%COMP%]{padding:16px}.description-container[_ngcontent-%COMP%]{margin:16vh 0 8vh;margin-top:10px;text-align:justify}.description-text[_ngcontent-%COMP%]{font-size:16px;line-height:1.5;text-align:justify;color:#444;margin:15px}.info-section[_ngcontent-%COMP%]{display:flex;align-items:center;margin-top:8px}.info-icon[_ngcontent-%COMP%]{font-size:18px;margin-right:8px;color:#666}.info-label[_ngcontent-%COMP%]{font-size:14px;color:#666}.like-animation[_ngcontent-%COMP%]{border:2px solid green;box-shadow:0 4px 8px #00800080}.dislike-animation[_ngcontent-%COMP%]{border:2px solid red;box-shadow:0 4px 8px #ff000080}.like-animation[_ngcontent-%COMP%]:before, .dislike-animation[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:40px;font-weight:700;color:#fff;text-transform:uppercase}.like-animation[_ngcontent-%COMP%]:before{content:"Like";color:green}.dislike-animation[_ngcontent-%COMP%]:before{content:"Dislike";color:red}']}),i})();function v(n,i){if(1&n&&e.nrm(0,"app-perfilmodal",6),2&n){const r=i.$implicit;e.xc7("position","absolute"),e.Y8G("perfis",r)}}const C=[{path:"",component:(()=>{var n;class i{constructor(t,o){this.router=t,this.PerfisService=o,this.perfis=[]}getPerfis(){this.PerfisService.getPerfis().subscribe({next:t=>{this.perfis=t,console.log("sucesso JSON"),console.log(this.perfis)},error:t=>{console.error("Erro ao carregar dados",t)}})}redirecionandoFiltro(){var t=this;return(0,p.A)(function*(){yield t.router.navigate(["/filtro"])})()}redirecionandoPerfil(){var t=this;return(0,p.A)(function*(){yield t.router.navigate(["/perfil-usuario"])})()}ngOnInit(){this.getPerfis()}}return(n=i).\u0275fac=function(t){return new(t||n)(e.rXU(c.Ix),e.rXU(u))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-home"]],decls:6,vars:2,consts:[[3,"fullscreen"],[1,"ion-margin","icons"],["size","large","name","funnel-outline",1,"icon-filtro",3,"click"],["size","large","name","person-circle-outline",1,"icon-perfil",3,"click"],[1,"modal-center"],[3,"perfis","position",4,"ngFor","ngForOf"],[3,"perfis"]],template:function(t,o){1&t&&(e.j41(0,"ion-content",0)(1,"div",1)(2,"ion-icon",2),e.bIt("click",function(){return o.redirecionandoFiltro()}),e.k0s(),e.j41(3,"ion-icon",3),e.bIt("click",function(){return o.redirecionandoPerfil()}),e.k0s()(),e.j41(4,"div",4),e.DNE(5,v,1,3,"app-perfilmodal",5),e.k0s()()),2&t&&(e.Y8G("fullscreen",!0),e.R7$(5),e.Y8G("ngForOf",o.perfis))},dependencies:[f.Sq,s.W9,s.iq,h],styles:[".icons[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between}.modal-center[_ngcontent-%COMP%]{--margin-top: 50%;--margin-bottom: 50%}"]}),i})()}];let x=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[c.iI.forChild(C),c.iI]}),i})(),y=(()=>{var n;class i{}return(n=i).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[f.MD,m.YN,s.bv,x]}),i})()}}]);