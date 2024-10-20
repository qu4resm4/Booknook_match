import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./match/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'estante',
    loadChildren: () => import('./livros/estante/estante.module').then( m => m.EstantePageModule)
  },
  {
    path: 'bemvindo',
    loadChildren: () => import('./acesso/mascara/bemvindo/bemvindo.module').then( m => m.BemvindoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./acesso/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'interesses',
    loadChildren: () => import('./acesso/cadastro/interesses/interesses.module').then( m => m.InteressesPageModule)
  },
  {
    path: 'idiomas',
    loadChildren: () => import('./acesso/cadastro/idiomas/idiomas.module').then( m => m.IdiomasPageModule)
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./livros/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'infolivro',
    loadChildren: () => import('./livros/infolivro/infolivro.module').then( m => m.InfolivroPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./acesso/cadastro/cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'filtro',
    loadChildren: () => import('./match/filtro/filtro.module').then( m => m.FiltroPageModule)
  },
  {
    path: 'inst-escolha',
    loadChildren: () => import('./acesso/cadastro/primeiro-livro/inst-escolha/inst-escolha.module').then( m => m.InstEscolhaPageModule)
  },
  {
    path: 'inst-adicione-bio',
    loadChildren: () => import('./acesso/cadastro/primeiro-livro/inst-adicione-bio/inst-adicione-bio.module').then( m => m.InstAdicioneBioPageModule)
  },
  {
    path: 'bio',
    loadChildren: () => import('./livros/criar-perfil-livro/bio/bio.module').then( m => m.BioPageModule)
  },
  {
    path: 'list-chats',
    loadChildren: () => import('./chat/list-chats/list-chats.module').then( m => m.ListChatsPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat/chat.module').then( m => m.ChatPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
