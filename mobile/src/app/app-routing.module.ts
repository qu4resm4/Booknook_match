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
    path: 'conversas',
    loadChildren: () => import('./chat/conversas/conversas.module').then( m => m.ConversasPageModule)
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
    path: 'infos',
    loadChildren: () => import('./acesso/cadastro/infos/infos.module').then( m => m.InfosPageModule)
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
    path: 'perfil-usuario',
    loadChildren: () => import('./match/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
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


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
