import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';



import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SocketService } from '../../socket.service';
@Component({
    selector: 'app-admin',
    standalone:true,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    imports: [ CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule,   RouterModule, NzLayoutModule, NzIconModule, NzMenuModule, RouterOutlet, CommonModule, RouterModule],
    // imports: [NzLayoutModule,  NzIconModule, NzMenuModule,  RouterOutlet, CommonModule, RouterModule],
})

export class AdminComponent implements OnInit {
    title:string = 'Pelasoa';
    test:string = 'test';
    isCollapsed:boolean = false;
    constructor(
        private socketService: SocketService
    ) { 

        this.socketService.listenForRdvEvent().subscribe((data) => {
            console.log('Received rdv event:', data);
            // Do something with the received data
        });
    }


// Somewhere in your component or service code


    ngOnInit() {
    //   this.socketService.connect();
        
    }
}


