import { Routes } from '@angular/router';

import { ClientAddComponent } from './components/client-add/client-add.component';
import { ServiceAddComponent } from './pages/admin/service/service-add/service-add.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PersonnelListComponent } from './pages/admin/personnel/personnel-list/personnel-list.component';
import { ServiceListeComponent } from './pages/admin/service/service-liste/service-liste.component';
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartsComponent } from './pages/admin/charts/charts.component';
import { RendezvousComponent } from './pages/client/rendezvous/rendezvous.component';


export const routes: Routes = [

    {
        path: 'manager',
        component: AdminComponent,
        children: [
            { path: 'service', component: ServiceListeComponent },
            { path: 'service/add', component: ServiceAddComponent },
            { path: 'addUtilisateur', component: ClientAddComponent },
            { path: 'employee', component: PersonnelListComponent },
            { path: 'chart', component: ChartsComponent },
        ]
    },

    {
        path: 'client', component: ClientComponent,

        children: [
            { path: 'rendezvous/add', component: RendezvousComponent },
        ]
    },




    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
