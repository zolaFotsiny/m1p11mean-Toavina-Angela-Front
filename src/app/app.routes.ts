import { Routes } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './home/home.component';
import { ServiceCreateComponent } from './manager/service-create/service-create.component';
import { AdminComponent } from './admin/admin.component';
import { ServiceListeComponent } from './admin/service-liste/service-liste.component';

export const routes: Routes = [
    {
        path: 'manager',
        component: ManagerComponent,
        children: [
            { path: 'saisiservice', component: ServiceCreateComponent },
            { path: 'service', component: ServiceListeComponent },
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'saisiservice', component: ServiceCreateComponent },
            { path: 'service', component: ServiceListeComponent },
        ]
    },
    { path: 'client', component: ClientComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
