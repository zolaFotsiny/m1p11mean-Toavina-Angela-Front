import { Component } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
