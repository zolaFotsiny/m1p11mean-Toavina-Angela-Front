import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../../../app.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientFicheComponent } from '../client-fiche/client-fiche.component';




interface ClientItem {
  _id: string;
  id_utilisateur: {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    type_utilisateur: string;
  } | null;
  date_creation: string;
}
@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  @ViewChild('content') content: any; // Declare the template reference variable
  modalContent: any; // Property to store the modal content

  searchValue = '';
  visible = false;
  isLoading = true;
  listOfData: ClientItem[] = [];
  listOfDisplayData: ClientItem[] = [];
  modalRef: NgbModalRef | null = null;
  constructor(private servicesService: ServicesService, private router: Router, private modalService: NgbModal) { }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ClientItem) => {
        if (item.id_utilisateur) {
          return item.id_utilisateur.nom.toLowerCase().includes(this.searchValue.toLowerCase());
        }
        return false;
      }
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.servicesService.getClients().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          console.log('huhuhuhuhuh', response.data);
          this.listOfData = response.data;
          this.listOfDisplayData = [...this.listOfData]; // Initialize listOfDisplayData with all services
          console.log('Employees:', this.listOfData);
        } else {
          console.error('Invalid response structure:', response);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.isLoading = false;
      }
    );
  }

  openModalClientFiche(clientId: string): void {
    console.log(clientId);
    this.modalRef = this.modalService.open(ClientFicheComponent);
    if (this.modalRef) { // Check if modalRef is not null
      this.modalRef.componentInstance.clientId = clientId;
    }
  }




  // navigateToClientFiche(clientId: string): void {
  //   this.router.navigate(['manager/client', clientId]);
  // }

}
