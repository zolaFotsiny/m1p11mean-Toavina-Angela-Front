import { Routes } from '@angular/router';

import { ClientAddComponent } from './pages/admin/client/client-add/client-add.component';
import { ServiceAddComponent } from './pages/admin/service/service-add/service-add.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PersonnelListComponent } from './pages/admin/personnel/personnel-list/personnel-list.component';
import { ServiceListeComponent } from './pages/admin/service/service-liste/service-liste.component';
import { ClientComponent } from './pages/client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { ChartsComponent } from './pages/admin/charts/charts.component';
import { RendezvousAddComponent } from './pages/client/rendezvous/rendezvous-add/rendezvous-add.component';
import { DragComponent } from './pages/admin/drag/drag.component';
import { CommissionComponent } from './pages/admin/commission/commission.component';
import { SortieComponent } from './pages/admin/finance/sortie/sortie.component';
import { SaisiesortieComponent } from './pages/admin/finance/saisiesortie/saisiesortie.component';
import { RendezvousListComponent } from './pages/client/rendezvous/rendezvous-list/rendezvous-list.component';
import { RendezVousFicheComponent } from './pages/client/rendezvous/rendez-vous-fiche/rendez-vous-fiche.component';
import { PaiementAddComponent } from './pages/client/paiement/paiement-add/paiement-add.component';
import { PaiementListComponent } from './pages/client/paiement/paiement-list/paiement-list.component';
import { ClientListComponent } from './pages/admin/client/client-list/client-list.component';
import { ClientFicheComponent } from './pages/admin/client/client-fiche/client-fiche.component';
import { PermissionGuard } from './utils/guards/permission.guard';
import { DeniedComponent } from './utils/guards/denied/denied.component';
import { DepenseAddComponent } from './pages/admin/depense/depense-add/depense-add.component';



export const routes: Routes = [

    {
        path: 'manager',
        component: AdminComponent,
        canActivate: [PermissionGuard],
        children: [
            { path: 'sortie/add', component: SaisiesortieComponent },
            { path: 'sortie', component: SortieComponent },
            { path: 'service', component: ServiceListeComponent },
            { path: 'service/add', component: ServiceAddComponent },
            { path: 'addUtilisateur', component: ClientAddComponent },
            { path: 'rendezvous/list', component: RendezvousListComponent },
            { path: 'employee', component: PersonnelListComponent },
            { path: 'chart', component: ChartsComponent },
            { path: 'drag', component: DragComponent },
            { path: 'commission', component: CommissionComponent },
            { path: 'client', component: ClientListComponent },
            { path: 'client/:id', component: ClientFicheComponent },
            { path: 'depense/add', component: DepenseAddComponent },
        ]
    },

    {
        path: 'client', component: ClientComponent,

        children: [
            { path: 'rendezvous/add', component: RendezvousAddComponent },
            { path: 'rendezvous/list', component: RendezvousListComponent },
            { path: 'rendezvous/:id', component: RendezVousFicheComponent },
            { path: 'payer/:id', component: PaiementAddComponent },
            { path: 'paiement', component: PaiementListComponent },
        ]
    },




    { path: 'denied', component: DeniedComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

];
