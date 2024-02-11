// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
// ];

// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

import { ClientComponent } from './pages/client/client.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { ListeComponent } from './pages/admin/liste/liste.component';

export const routes: Routes = [

  // Todo lazy loading
   
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },


  { path: '', component: WelcomeComponent }, // Page de connexion par défaut

  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      { path: 'list', component: ListeComponent },
    ]
  },

  { path: 'client', component: LoginComponent }, 
  // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
