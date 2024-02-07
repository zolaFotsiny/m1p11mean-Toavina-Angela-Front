import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { BannerComponent } from './components/banner/banner.component';


@Component({
  imports: [
    HeaderComponent, FooterComponent, BodyComponent, BannerComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true // This marks the component as standalone
})
export class AppComponent {

}

