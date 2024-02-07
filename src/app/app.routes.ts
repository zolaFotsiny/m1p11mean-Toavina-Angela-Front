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
import { ClientComponent } from './pages/client/client.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Page de connexion par défaut
  { path: 'login', component: LoginComponent }, // Page de connexion par défaut
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'client', component: ClientComponent, canActivate: [ClientGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
