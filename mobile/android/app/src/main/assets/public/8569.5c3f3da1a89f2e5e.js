"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8569],{8569:(E,v,s)=>{s.r(v),s.d(v,{InfolivroPageModule:()=>x});var u=s(177),m=s(4341),r=s(4742),f=s(9384),g=s(467),o=s(4438),p=s(2872),b=s(2557),h=s(1893);function I(n,l){if(1&n&&(o.j41(0,"h2",14),o.EFF(1),o.k0s()),2&n){const t=o.XpG(2);o.R7$(),o.JRh(t.livro.volumeInfo.subtitle)}}function _(n,l){if(1&n&&(o.j41(0,"div",15)(1,"p"),o.EFF(2),o.k0s()()),2&n){const t=o.XpG(2);o.R7$(2),o.JRh(t.livro.volumeInfo.description)}}function k(n,l){if(1&n){const t=o.RV6();o.j41(0,"div")(1,"ion-fab-button",10),o.bIt("click",function(){o.eBV(t);const e=o.XpG(2);return o.Njj(e.adicionarEstante(e.livro.id,e.livro.volumeInfo.title,null==e.livro.volumeInfo.imageLinks?null:e.livro.volumeInfo.imageLinks.thumbnail))}),o.nrm(2,"ion-icon",16),o.k0s()()}}function P(n,l){if(1&n){const t=o.RV6();o.j41(0,"div")(1,"ion-fab-button",10),o.bIt("click",function(){o.eBV(t);const e=o.XpG(2);return o.Njj(e.adicionarResenha())}),o.nrm(2,"ion-icon",17),o.k0s()()}}function F(n,l){if(1&n){const t=o.RV6();o.j41(0,"ion-content")(1,"div",2),o.nrm(2,"ion-img",3),o.j41(3,"h1",4),o.EFF(4),o.k0s(),o.DNE(5,I,2,1,"h2",5),o.j41(6,"p",6)(7,"strong"),o.EFF(8,"Autores:"),o.k0s(),o.EFF(9),o.k0s(),o.j41(10,"p")(11,"strong"),o.EFF(12,"Editora:"),o.k0s(),o.EFF(13),o.k0s(),o.j41(14,"p")(15,"strong"),o.EFF(16,"Data de Publica\xe7\xe3o:"),o.k0s(),o.EFF(17),o.k0s(),o.j41(18,"p",7)(19,"strong"),o.EFF(20,"Categorias:"),o.k0s(),o.EFF(21),o.k0s(),o.j41(22,"ion-item",8)(23,"ion-label")(24,"strong"),o.EFF(25,"Descri\xe7\xe3o"),o.k0s()(),o.j41(26,"ion-buttons",9)(27,"ion-button",10),o.bIt("click",function(){o.eBV(t);const e=o.XpG();return o.Njj(e.toggleDescription())}),o.nrm(28,"ion-icon",11),o.k0s()()(),o.DNE(29,_,3,1,"div",12),o.k0s(),o.j41(30,"ion-fab",13),o.DNE(31,k,3,0,"div",1)(32,P,3,0,"div",1),o.k0s()()}if(2&n){const t=o.XpG();o.R7$(2),o.FS9("alt",t.livro.volumeInfo.title),o.Y8G("src","assets/imgs/capa.jpg"),o.R7$(2),o.JRh(t.livro.volumeInfo.title),o.R7$(),o.Y8G("ngIf",t.livro.volumeInfo.subtitle),o.R7$(4),o.SpI(" ",null==t.livro.volumeInfo.authors?null:t.livro.volumeInfo.authors.join(", ")," "),o.R7$(4),o.SpI(" ",t.livro.volumeInfo.publisher," "),o.R7$(4),o.SpI(" ",t.livro.volumeInfo.publishedDate," "),o.R7$(4),o.SpI(" ",null==t.livro.volumeInfo.categories?null:t.livro.volumeInfo.categories.join(", ")," "),o.R7$(7),o.Y8G("name",t.showDescription?"chevron-up":"chevron-down"),o.R7$(),o.Y8G("ngIf",t.showDescription),o.R7$(2),o.Y8G("ngIf","lib"==t.btnAdd),o.R7$(),o.Y8G("ngIf","bio"==t.btnAdd)}}const R=[{path:"",component:(()=>{var n;class l{constructor(i,e,a,c){this.navCtrl=i,this.livrosService=e,this.loadingController=a,this.storage=c,this.id="",this.showDescription=!1,this.btnAdd=""}adicionarEstante(i,e,a){var c=this;return(0,g.A)(function*(){const d={id:i,title:e,thumbnail:a};console.log(d),yield c.storage.adicionarNaEstante(d,"-TODOS"),c.navCtrl.navigateForward("tabs/estante")})()}adicionarResenha(){var i=this;return(0,g.A)(function*(){i.navCtrl.navigateForward("bio",{queryParams:{livro:JSON.stringify(i.livro)}})})()}redirecionandoVoltar(){this.livrosService.setData(""),this.navCtrl.navigateForward("tabs/estante")}toggleDescription(){this.showDescription=!this.showDescription}aoIniciar(){this.id=this.livrosService.getData(),this.btnAdd=this.livrosService.getAdd(),this.livrosService.getLivrosbyId(this.id).subscribe({next:i=>{console.log(i),this.livro=i},error:i=>{console.error("Erro ao buscar os dados do livro:",i)}})}ngOnInit(){this.aoIniciar()}}return(n=l).\u0275fac=function(i){return new(i||n)(o.rXU(p.q9),o.rXU(b.t),o.rXU(r.Xi),o.rXU(h.b))},n.\u0275cmp=o.VBU({type:n,selectors:[["app-infolivro"]],decls:4,vars:1,consts:[["size","large","slot","start","name","arrow-back-outline",1,"ion-margin",3,"click"],[4,"ngIf"],[1,"book-details-container"],[3,"src","alt"],[1,"book-title"],["class","book-subtitle",4,"ngIf"],[1,"book-authors"],[1,"book-categories"],["lines","none"],["slot","end"],[3,"click"],[3,"name"],["class","book-description",4,"ngIf"],["vertical","bottom","horizontal","end","slot","fixed"],[1,"book-subtitle"],[1,"book-description"],["name","add"],["name","pencil-outline"]],template:function(i,e){1&i&&(o.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-icon",0),o.bIt("click",function(){return e.redirecionandoVoltar()}),o.k0s()()(),o.DNE(3,F,33,12,"ion-content",1)),2&i&&(o.R7$(3),o.Y8G("ngIf",e.livro))},dependencies:[u.bT,r.Jm,r.QW,r.W9,r.Q8,r.YW,r.eU,r.iq,r.KW,r.uz,r.he,r.ai],styles:['@charset "UTF-8";.book-details-container[_ngcontent-%COMP%]{padding:16px}ion-img[_ngcontent-%COMP%]{width:150px;height:auto;margin:0 auto 16px;display:block}.book-title[_ngcontent-%COMP%]{font-size:24px;font-weight:700;margin:16px 0 8px;text-align:center}.book-subtitle[_ngcontent-%COMP%]{font-size:18px;font-style:italic;text-align:center;margin-bottom:16px}.book-authors[_ngcontent-%COMP%], .book-categories[_ngcontent-%COMP%]{font-size:16px;margin-bottom:8px}.book-description[_ngcontent-%COMP%]{padding:16px;background-color:#f9f9f9;border-radius:8px}ion-fab-button[_ngcontent-%COMP%]{--background: #3880ff}']}),l})()}];let j=(()=>{var n;class l{}return(n=l).\u0275fac=function(i){return new(i||n)},n.\u0275mod=o.$C({type:n}),n.\u0275inj=o.G2t({imports:[f.iI.forChild(R),f.iI]}),l})(),x=(()=>{var n;class l{}return(n=l).\u0275fac=function(i){return new(i||n)},n.\u0275mod=o.$C({type:n}),n.\u0275inj=o.G2t({imports:[u.MD,m.YN,r.bv,j]}),l})()}}]);