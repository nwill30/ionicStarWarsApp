import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'films',
        children: [
          {
            path: '',
            loadChildren: '../films/films.module#FilmsPageModule'
          },
          {
            /**:id helps to pass info from url */
            path: ':id',
            loadChildren: '../film-details/film-details.module#FilmDetailsPageModule'
          }
        ]
      },
      {
        path: 'people',
        children: [
          {
            path: '',
            loadChildren: '../people/people.module#PeoplePageModule'
          },
          {
              /**:id helps to pass info from url */
              path: ':id',
              loadChildren: '../people-details/people-details.module#PeopleDetailsPageModule'
          }
        ]
      },
      {
        path: 'planets',
        children: [
          {
            path: '',
            loadChildren: '../planets/planets.module#PlanetsPageModule'
          },
          {
            /**:id helps to pass info from url */
            path: ':id',
            loadChildren: '../planets-details/planets-details.module#PlanetsDetailsPageModule'
        }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/films',
    pathMatch: 'full'
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRouterModule { }
