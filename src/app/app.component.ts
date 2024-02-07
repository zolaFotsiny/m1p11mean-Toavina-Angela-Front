import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { BannerComponent } from './banner/banner.component';


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

