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
      {
        path: '',
        redirectTo: 'match', 
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
