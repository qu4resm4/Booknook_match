"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[3175],{3175:(C,v,s)=>{s.r(v),s.d(v,{EstantePageModule:()=>x});var g=s(177),d=s(4341),i=s(4742),_=s(9384),c=s(467),n=s(4438),m=s(2872),p=s(2557),f=s(1893);function h(o,l){if(1&o){const a=n.RV6();n.j41(0,"ion-button",19),n.bIt("click",function(){n.eBV(a);const e=n.XpG().$implicit,r=n.XpG(2);return n.Njj(r.favoritarLivro(e))}),n.nrm(1,"ion-icon",20),n.k0s()}}function E(o,l){if(1&o){const a=n.RV6();n.j41(0,"ion-button",21),n.bIt("click",function(){n.eBV(a);const e=n.XpG().$implicit,r=n.XpG(2);return n.Njj(r.excluirLivro(e.id,r.colecaoSelecionada))}),n.nrm(1,"ion-icon",22),n.k0s()}}function b(o,l){if(1&o){const a=n.RV6();n.j41(0,"ion-col",12)(1,"ion-card",13)(2,"div",14),n.DNE(3,h,2,0,"ion-button",15)(4,E,2,0,"ion-button",16),n.k0s(),n.j41(5,"ion-img",17),n.bIt("click",function(){const e=n.eBV(a).$implicit,r=n.XpG(2);return n.Njj(r.redirecionandoInfoLivro(e.id))}),n.k0s()(),n.j41(6,"ion-label",18),n.EFF(7),n.k0s()()}if(2&o){const a=l.$implicit,t=n.XpG(2);n.R7$(3),n.Y8G("ngIf","-FAVORITOS"!==t.colecaoSelecionada),n.R7$(),n.Y8G("ngIf","-RESENHADOS"!=t.colecaoSelecionada),n.R7$(),n.Y8G("src","assets/imgs/capa.jpg"),n.R7$(2),n.SpI(" ",a.title," ")}}function P(o,l){if(1&o&&(n.j41(0,"ion-grid")(1,"ion-row"),n.DNE(2,b,8,4,"ion-col",11),n.k0s()()),2&o){const a=n.XpG();n.R7$(2),n.Y8G("ngForOf",a.livros)}}function S(o,l){1&o&&(n.j41(0,"ion-label",23),n.EFF(1," Sua estante est\xe1 vazia. Adicione livros para come\xe7ar! "),n.k0s())}const O=[{path:"",component:(()=>{var o;class l{constructor(t,e,r){this.navCtrl=t,this.livrosService=e,this.storage=r,this.colecaoSelecionada="-TODOS",this.livros=[],this.livrosFiltrados=[]}ngOnInit(){this.init()}ionViewWillEnter(){this.carregarLivros(this.colecaoSelecionada)}init(){var t=this;return(0,c.A)(function*(){t.livrosService.setAdd("bio"),t.carregarLivros(t.colecaoSelecionada)})()}carregarLivros(t){var e=this;return(0,c.A)(function*(){e.livros=yield e.storage.getTodos(t)})()}redirecionandoInfoLivro(t){this.livrosService.setAdd("bio"),console.log("estou sendo clicado livro"),this.livrosService.setData(t),this.navCtrl.navigateForward("infolivro")}redirecionarBuscarLivro(){this.livrosService.setAdd("lib"),this.navCtrl.navigateForward("pesquisar")}favoritarLivro(t){var e=this;return(0,c.A)(function*(){yield e.storage.adicionarNaEstante(t,"-FAVORITOS"),console.log("Favotiro sendo clicado")})()}excluirLivro(t,e){var r=this;return(0,c.A)(function*(){"-RESENHADOS"!=e&&(yield r.storage.excluirDaEstante(t,e)),r.carregarLivros(r.colecaoSelecionada)})()}}return(o=l).\u0275fac=function(t){return new(t||o)(n.rXU(m.q9),n.rXU(p.t),n.rXU(f.b))},o.\u0275cmp=n.VBU({type:o,selectors:[["app-estante"]],decls:17,vars:3,consts:[[3,"ngModelChange","ionChange","ngModel"],["value","-TODOS"],["name","book-outline"],["value","-RESENHADOS"],["name","newspaper-outline"],["value","-FAVORITOS"],["name","star-outline"],[4,"ngIf"],["class","sem-livros",4,"ngIf"],["vertical","bottom","horizontal","end","slot","fixed"],["name","add",3,"click"],["size","6",4,"ngFor","ngForOf"],["size","6"],[1,"livro-card"],[1,"overlay-buttons"],["color","danger",3,"click",4,"ngIf"],["color","primary",3,"click",4,"ngIf"],[3,"click","src"],[1,"title"],["color","danger",3,"click"],["name","heart"],["color","primary",3,"click"],["name","trash"],[1,"sem-livros"]],template:function(t,e){1&t&&(n.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),n.EFF(3,"Minha Estante"),n.k0s()()(),n.j41(4,"ion-content")(5,"ion-segment",0),n.mxI("ngModelChange",function(u){return n.DH7(e.colecaoSelecionada,u)||(e.colecaoSelecionada=u),u}),n.bIt("ionChange",function(){return e.carregarLivros(e.colecaoSelecionada)}),n.j41(6,"ion-segment-button",1),n.nrm(7,"ion-icon",2),n.k0s(),n.j41(8,"ion-segment-button",3),n.nrm(9,"ion-icon",4),n.k0s(),n.j41(10,"ion-segment-button",5),n.nrm(11,"ion-icon",6),n.k0s()(),n.DNE(12,P,3,1,"ion-grid",7)(13,S,2,0,"ion-label",8),n.j41(14,"ion-fab",9)(15,"ion-fab-button")(16,"ion-icon",10),n.bIt("click",function(){return e.redirecionarBuscarLivro()}),n.k0s()()()()),2&t&&(n.R7$(5),n.R50("ngModel",e.colecaoSelecionada),n.R7$(7),n.Y8G("ngIf",e.livros.length>0),n.R7$(),n.Y8G("ngIf",0===e.livros.length))},dependencies:[g.Sq,g.bT,d.BC,d.vS,i.Jm,i.b_,i.hU,i.W9,i.Q8,i.YW,i.lO,i.eU,i.iq,i.KW,i.he,i.ln,i.Gp,i.eP,i.BC,i.ai,i.Je],styles:['@charset "UTF-8";.livro-card[_ngcontent-%COMP%]{margin:10px 0;box-shadow:none}.livro-titulo[_ngcontent-%COMP%]{font-weight:700;font-size:14px;text-align:center;color:#333;margin-top:5px}.livro-autor[_ngcontent-%COMP%]{font-size:12px;text-align:center;color:#666}.sem-livros[_ngcontent-%COMP%]{text-align:center;margin-top:20px;font-style:italic;color:#aaa}.title[_ngcontent-%COMP%]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;white-space:normal;margin-left:10%}.livro-card[_ngcontent-%COMP%]{position:relative}.overlay-buttons[_ngcontent-%COMP%]{position:absolute;bottom:8px;right:8px;display:flex;gap:8px;z-index:10}.overlay-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--padding-start: 8px;--padding-end: 8px}']}),l})()}];let k=(()=>{var o;class l{}return(o=l).\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[_.iI.forChild(O),_.iI]}),l})(),x=(()=>{var o;class l{}return(o=l).\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.$C({type:o}),o.\u0275inj=n.G2t({imports:[g.MD,d.YN,i.bv,k]}),l})()}}]);