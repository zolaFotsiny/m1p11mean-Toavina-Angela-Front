import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ServiceCreateComponent } from './service-create/service-create.component';
@Component({
    selector: 'app-admin',
    standalone:true,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    imports: [ServiceCreateComponent, CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, NzBreadCrumbModule,   RouterModule, NzLayoutModule, NzIconModule, NzMenuModule, RouterOutlet, CommonModule, RouterModule],
    // imports: [NzLayoutModule,  NzIconModule, NzMenuModule,  RouterOutlet, CommonModule, RouterModule],
})

export class AdminComponent {
    title:string = 'Pelasoa';
    test:string = 'test';
    isCollapsed:boolean = false;
    constructor() { }

    // ngOnInit() {
    //     // alert('test');
    //     console.log(this.test);  // Use "this.test" to access the class property
    // }
}


