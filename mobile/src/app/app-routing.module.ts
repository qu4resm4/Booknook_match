import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard'; 

const routes: Routes = [
  
  {
    path: '',/*
    redirectTo: '/login',
    pathMatch: 'full',*/
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { 
    path: 'login',
    loadChildren: () => import('./acesso/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'esqueceu-senha',
    loadChildren: () => import('./acesso/esqueceu-senha/esqueceu-senha.module').then( m => m.EsqueceuSenhaPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./acesso/cadastro/cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule),
  },
  {
    path: 'interesses',
    loadChildren: () => import('./acesso/cadastro/interesses/interesses.module').then( m => m.InteressesPageModule),
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
    path: 'pesquisar',
    loadChildren: () => import('./livros/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'infolivro',
    loadChildren: () => import('./livros/infolivro/infolivro.module').then( m => m.InfolivroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'filtro',
    loadChildren: () => import('./match/filtro/filtro.module').then( m => m.FiltroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inst-escolha',
    loadChildren: () => import('./acesso/cadastro/primeiro-livro/inst-escolha/inst-escolha.module').then( m => m.InstEscolhaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inst-adicione-bio',
    loadChildren: () => import('./acesso/cadastro/primeiro-livro/inst-adicione-bio/inst-adicione-bio.module').then( m => m.InstAdicioneBioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bio',
    loadChildren: () => import('./livros/bio/bio.module').then( m => m.BioPageModule),
  },
  {
    path: 'list-chats',
    loadChildren: () => import('./chat/list-chats/list-chats.module').then( m => m.ListChatsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./chat/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./chat/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
