import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSmallHeader: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSmallHeader = window.scrollY > 100; // Adjust the scroll threshold as needed
  }
}
