"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9601],{9601:(C,u,a)=>{a.r(u),a.d(u,{PesquisarPageModule:()=>I});var c=a(177),g=a(4341),l=a(4742),m=a(9384),f=a(467),e=a(4438),h=a(2872),P=a(2557);function v(i,n){if(1&i){const s=e.RV6();e.j41(0,"ion-col",3)(1,"ion-card",4),e.bIt("click",function(){const r=e.eBV(s).$implicit,t=e.XpG(2);return e.Njj(t.redirecionandoInfoLivro(r.id))}),e.j41(2,"img",5),e.bIt("load",function(r){e.eBV(s);const t=e.XpG(2);return e.Njj(t.onImageLoad(r))})("error",function(){e.eBV(s);const r=e.XpG(2);return e.Njj(r.onImageError())}),e.k0s()(),e.j41(3,"ion-label",6),e.EFF(4),e.k0s()()}if(2&i){const s=n.$implicit;e.R7$(2),e.FS9("alt",s.volumeInfo.title),e.Y8G("src","assets/imgs/capa.jpg",e.B4B),e.R7$(2),e.SpI(" ",s.volumeInfo.title," ")}}function p(i,n){if(1&i&&(e.j41(0,"ion-grid")(1,"ion-row"),e.DNE(2,v,5,3,"ion-col",2),e.k0s()()),2&i){const s=e.XpG();e.R7$(2),e.Y8G("ngForOf",s.livros)}}const _=[{path:"",component:(()=>{var i;class n{constructor(o,r,t){this.navCtrl=o,this.loadingController=r,this.livrosService=t,this.query="",this.livros=[],this.totalImages=0,this.imagesLoaded=0}getLivros(){var o=this;return(0,f.A)(function*(){const r=yield o.loadingController.create({spinner:"circular",cssClass:"custom"});yield r.present(),""!==o.query.trim()?yield o.livrosService.getLivros(o.query).subscribe({next:t=>{o.livros=t.items||[],o.totalImages=o.livros.length,o.imagesLoaded=0,0===o.totalImages&&r.dismiss()},error:t=>{console.error("Erro ao carregar dados",t),r.dismiss()}}):r.dismiss()})()}onImageLoad(o){this.imagesLoaded++,this.imagesLoaded===this.totalImages&&this.loadingController.dismiss()}onImageError(){this.imagesLoaded++,this.imagesLoaded===this.totalImages&&this.loadingController.dismiss()}redirecionandoInfoLivro(o){console.log("Livro clicado:",o),this.livrosService.setData(o),this.navCtrl.navigateForward("infolivro")}ngOnInit(){}}return(i=n).\u0275fac=function(o){return new(o||i)(e.rXU(h.q9),e.rXU(l.Xi),e.rXU(P.t))},i.\u0275cmp=e.VBU({type:i,selectors:[["app-pesquisar"]],decls:3,vars:2,consts:[["show-cancel-button","focus","placeholder","Pesquisar livros",1,"custom",3,"ngModelChange","ionChange","ngModel"],[4,"ngIf"],["size","6",4,"ngFor","ngForOf"],["size","6"],[3,"click"],[3,"load","error","src","alt"],[1,"title"]],template:function(o,r){1&o&&(e.j41(0,"ion-searchbar",0),e.mxI("ngModelChange",function(d){return e.DH7(r.query,d)||(r.query=d),d}),e.bIt("ionChange",function(){return r.getLivros()}),e.k0s(),e.j41(1,"ion-content"),e.DNE(2,p,3,1,"ion-grid",1),e.k0s()),2&o&&(e.R50("ngModel",r.query),e.R7$(2),e.Y8G("ngIf",r.livros))},dependencies:[c.Sq,c.bT,g.BC,g.vS,l.b_,l.hU,l.W9,l.lO,l.he,l.ln,l.S1,l.Gw],styles:['@charset "UTF-8";ion-loading.custom[_ngcontent-%COMP%]{--backdrop-opacity: #000000;--background: #000000;--height: ;--max-height: ;--max-width: ;--min-height: ;--min-width: ;--spinner-color: #faef33;--width: }ion-searchbar.custom[_ngcontent-%COMP%]{--background: #817f99;--color: #fff;--placeholder-color: #fff;--icon-color: #fff;--clear-button-color: #fff;margin-top:1vh;--border-radius: 8px}.title[_ngcontent-%COMP%]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;white-space:normal;margin-left:10%}']}),n})()}];let q=(()=>{var i;class n{}return(i=n).\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.$C({type:i}),i.\u0275inj=e.G2t({imports:[m.iI.forChild(_),m.iI]}),n})(),I=(()=>{var i;class n{}return(i=n).\u0275fac=function(o){return new(o||i)},i.\u0275mod=e.$C({type:i}),i.\u0275inj=e.G2t({imports:[c.MD,g.YN,l.bv,q]}),n})()}}]);