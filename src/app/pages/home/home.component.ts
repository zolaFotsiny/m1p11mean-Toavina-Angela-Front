import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { BodyComponent } from './body/body.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, BannerComponent, BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
