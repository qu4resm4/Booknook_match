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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
