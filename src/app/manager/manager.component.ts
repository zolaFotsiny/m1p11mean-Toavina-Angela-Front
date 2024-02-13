import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [NzLayoutModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, ServiceCreateComponent, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  isCollapsed = false;
}
