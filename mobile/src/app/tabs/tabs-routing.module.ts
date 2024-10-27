import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'match',
        loadChildren: () => import('../match/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'estante',
        loadChildren: () => import('../livros/estante/estante.module').then(m => m.EstantePageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/list-chats/list-chats.module').then(m => m.ListChatsPageModule)
      },
      { path: 'login', loadChildren: () => import('../acesso/login/login.module').then( m => m.LoginPageModule)

      },
      
      
      {
        path: '',
        redirectTo: '/tabs/match',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/match',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
