import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';


@Component({
  imports: [
    HeaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true // This marks the component as standalone
})
export class AppComponent {

}

