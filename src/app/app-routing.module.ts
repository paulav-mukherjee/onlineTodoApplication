import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageComponent } from './home/page/page.component';
import { AuthGuard } from './users/Guard/auth.guard';
import { LoaderComponent } from './Loader/Api/loader/loader.component';
import { MainLoaderComponent } from './Loader/Main/main-loader/main-loader.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    loadChildren: () => import('./todos/todos.module')
      .then(m => m.TodosModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
  },
  {
    path: 'home',
    component: PageComponent
  },
  {
    path:'api-loader',
    component: LoaderComponent
  },
  {
    path: 'wait',
    component: MainLoaderComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
