import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'm1p11mean-Toavina-Angela-Front';
  images = ['assets/hello.png', 'assets/img-7.png', 'assets/3.png'];
}
