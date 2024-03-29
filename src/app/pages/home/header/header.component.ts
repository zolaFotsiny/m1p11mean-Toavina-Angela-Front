import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { LoginComponent } from '../banner/login/login.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoginComponent, RouterModule, CommonModule],
  providers: [NgbOffcanvasConfig, NgbOffcanvas],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isSmallHeader: boolean = false;
  // Ajoutez ces propriétés à votre composant
  isMobileNavOpen = false;
  isSmallScreen = window.innerWidth < 768; // Vous pouvez ajuster la largeur selon vos besoins

  ngOnInit(): void {

  }
  constructor(
    config: NgbOffcanvasConfig,
    private offcanvasService: NgbOffcanvas,
    private router: Router
  ) {
    // customize default values of offcanvas used by this component tree
    config.position = 'end';
    config.backdropClass = 'bg-info';
    config.keyboard = false;
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }
  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content);
  }
  get isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    // Rediriger l'utilisateur vers la page de connexion ou actualiser la page
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
