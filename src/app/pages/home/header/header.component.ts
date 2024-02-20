import { Component, HostListener } from '@angular/core';
import { LoginComponent } from '../banner/login/login.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSmallHeader: boolean = false;
  // Ajoutez ces propriétés à votre composant
  isMobileNavOpen = false;
  isSmallScreen = window.innerWidth < 768; // Vous pouvez ajuster la largeur selon vos besoins

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = (event.target as Window).innerWidth < 768;
    this.isMobileNavOpen = false; // Fermez le menu lorsqu'il y a un redimensionnement
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSmallHeader = window.scrollY > 100; // Adjust the scroll threshold as needed
  }
}
