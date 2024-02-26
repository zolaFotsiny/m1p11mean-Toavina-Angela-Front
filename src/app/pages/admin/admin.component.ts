import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';



import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SocketService } from '../../socket.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule, RouterModule, NzLayoutModule, NzIconModule, NzMenuModule, RouterOutlet, CommonModule, RouterModule],
    // imports: [NzLayoutModule,  NzIconModule, NzMenuModule,  RouterOutlet, CommonModule, RouterModule],
})

export class AdminComponent implements OnInit {
    title: string = 'Pelasoa';
    test: string = 'test';
    isCollapsed: boolean = false;
    showNotif: boolean = false;


    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        // Rediriger l'utilisateur vers la page de connexion ou actualiser la page
    }


    constructor(
        private socketService: SocketService, private router: Router, private notification: NzNotificationService
    ) {

        this.socketService.listenForRdvEvent().subscribe((data) => {
            if (data) {
                this.showNotif = true;
                this.notification.create(
                    'success',
                    'Notification',
                    'Nouveaux rendez vous!',
                    { nzPlacement: 'bottomLeft' }
                );
            }
            console.log('Received rdv event:', data);
        });
    }


    // Somewhere in your component or service code


    ngOnInit() {
        //   this.socketService.connect();

    }
}


