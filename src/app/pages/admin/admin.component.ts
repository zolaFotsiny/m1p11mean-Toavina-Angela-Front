import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
    selector: 'app-admin',
    standalone:true,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
})

export class AdminComponent implements OnInit {
    title:string = 'Pelasoa';
    test:string = 'test';
    isCollapsed:boolean = false;
    constructor() { }

    ngOnInit() {
        // alert('test');
        console.log(this.test);  // Use "this.test" to access the class property
    }
}


