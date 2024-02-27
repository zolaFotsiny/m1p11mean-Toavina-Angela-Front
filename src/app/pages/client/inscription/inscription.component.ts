import { Component } from '@angular/core';
import { NzDrawerPlacement, NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  standalone: true,
  imports: [NzDrawerModule],
})
export class InscriptionComponent {
  visible = false;
  placement: NzDrawerPlacement = 'left';

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
