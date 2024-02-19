import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../app.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'home-body',
  standalone: true,
  imports: [CommonModule, NzFlexModule, NzSpinModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  title = 'm1p11mean-Toavina-Angela-Front';

  services: any[] = [];
  displayedServices: any[] = []; // Les services à afficher
  itemsToShow = 4; // Nombre initial d'éléments à afficher

  employee: any[] = [];
  isLoading = true; // Add a loading flag

  constructor(private servicesService: ServicesService) { }

  showMoreServices() {
    // Afficher plus d'éléments à chaque clic sur le bouton
    this.itemsToShow += 4; // Ajoute 4 éléments supplémentaires
    this.displayedServices = this.services.slice(0, this.itemsToShow);
  }
  ngOnInit(): void {
    console.log('ngOnInit called');
    this.displayedServices = this.services.slice(0, this.itemsToShow);
    this.servicesService.getServices().subscribe(
      (response: any) => {
        console.log('Raw response:', response);


        // Access the 'data' property if it exists
        if (response && response.data) {
          this.services = response.data;
          console.log('Services:', this.services);
          this.displayedServices = this.services.slice(0, this.itemsToShow);
        } else {
          console.error('Invalid response structure:', response);
        }
        // Set loading flag to false once data is obtained
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );



    this.servicesService.getEmployees().subscribe(
      (response: any) => {
        console.log('Employer:', response);

        // Access the 'data' property if it exists
        if (response && response.data) {
          this.employee = response.data;
          console.log('emp:', this.services);
        } else {
          console.error('Invalid response structure:', response);
        }

        // Set loading flag to false once data is obtained
        // this.isLoading = false;
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }
}
