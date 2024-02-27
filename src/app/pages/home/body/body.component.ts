import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from '../home.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../app.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { HeartFill, HeartOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RendezvousAddComponent } from '../../client/rendezvous/rendezvous-add/rendezvous-add.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'home-body',
  standalone: true,
  imports: [NzToolTipModule, CommonModule, NzFlexModule, NzSpinModule, NzIconModule, RendezvousAddComponent],
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
  get isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  @ViewChild('content') content: any; // Declare the template reference variable
  modalContent: any; // Property to store the modal content


  passedService: any;
  openModal(content: any, servicePass: any) {
    const modalOptions: NgbModalOptions = {
      centered: true,
      size: 'lg'
    };

    this.passedService = servicePass; // Assurez-vous que passedService est correctement initialisée
    this.modalContent = content; // Set the content for the modal

    console.log('test', servicePass);

    const modalRef = this.modalService.open(this.content, modalOptions);

    modalRef.result.then(
      (result) => {
        // Handle modal close
      },
      (reason) => {
        // Handle modal dismiss
      }
    );
  }
  constructor(private servicesService: ServicesService, private modalService: NgbModal) {
    // this.iconService.addIcon(...[HeartFill, HeartOutline]);
  }
  isFavorited(service: any): boolean {
    // Logique pour déterminer si le service est favori ou non
    // Retourne true ou false en fonction de la logique d'application
    return true; // par exemple
  }
  toggleFavorite(service: any): void {
    // Logique pour basculer l'état de favori du service
    // Par exemple, vous pourriez utiliser une propriété dans le service pour indiquer s'il est favori
    service.isFavorite = !service.isFavorite;
  }
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
