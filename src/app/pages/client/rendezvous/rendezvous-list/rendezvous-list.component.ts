import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicesService } from '../../../../app.service';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { RendezvousAddComponent } from '../rendezvous-add/rendezvous-add.component';
import { jwtDecode } from 'jwt-decode';

interface RendezvousItem {
  _id: string;
  id_client: string;
  remarque: string;
  taches: [
    {
      _id: string;
      id_employee: {
        _id: string;
        id_utilisateur: {
          _id: string;
          nom: string;
          prenom: string;
          email: string;
          type_utilisateur: string;
          __v: number; // Ajouté
        };
        date_creation: string;
        __v: number; // Ajouté
      };
      id_service: {
        _id: string;
        designation: string;
        prix: number;
        duree: number;
        commission_pourcentage: number;
        etat: number;
        date_insertion: string;
        __v: number; // Ajouté
      };
      id_rendezvous: string;
      date_debut: string;
      etat: number;
      __v: number; // Ajouté
    }
  ];
  date_heure: string;
  etat: number;
  __v: number; // Ajouté
}

@Component({
  selector: 'app-rendezvous-list',
  standalone: true,
  imports: [
    NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule, RouterModule, RendezvousAddComponent, NgbTooltip
  ],
  templateUrl: './rendezvous-list.component.html',
  styleUrl: './rendezvous-list.component.scss'
})


export class RendezvousListComponent implements OnInit {
  searchValueDateDebut = '';
  visibleDateDebut = false;
  searchValueNom = '';
  visibleNom = false;
  isLoading = true;
  listOfData: RendezvousItem[] = [];
  listOfDisplayData: RendezvousItem[] = [];
  @ViewChild('content') content: any;
  modalContent: any;


  constructor(private modalService: NgbModal, private servicesService: ServicesService, private cdRef: ChangeDetectorRef) { }



  resetDateDebut(): void {
    this.searchValueDateDebut = '';
    this.searchDateDebut();
  }
  // Dans le composant parent
  onNewRendezvousAdded(newRendezvous: any) {
    this.listOfData.push(newRendezvous);
    this.listOfDisplayData = [...this.listOfData];
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

  searchDateDebut(): void {
    this.visibleDateDebut = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: RendezvousItem) =>
        item.taches.some(tache =>
          new Date(tache.date_debut).toLocaleDateString().includes(this.searchValueDateDebut)
        )
    );
  }

  resetNom(): void {
    this.searchValueNom = '';
    this.searchNom();
  }

  searchNom(): void {
    this.visibleNom = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: RendezvousItem) =>
        item.taches.some(tache =>
          tache.id_employee.id_utilisateur.nom.toLowerCase().includes(this.searchValueNom.toLowerCase())
        )
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getRendezVous().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          this.listOfData = response.data;
          this.listOfDisplayData = [...this.listOfData]; // Initialize listOfDisplayData with all rendezvous
          console.log('Rendezvous:', this.listOfData);
        } else {
          console.log('Invalid response structure:', response);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching rendezvous:', error);
        this.isLoading = false;
      }
    );
  }

  isClient(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && decodedToken.type_utilisateur) {
        if (decodedToken.type_utilisateur === 'client') {
          return true;
        }
      }
    } else {
      console.error('Token is null');
    }
    return false;
  }

  isManager(): boolean {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken: any = jwtDecode(token);

      if (decodedToken && decodedToken.type_utilisateur) {
        if (decodedToken.type_utilisateur === 'manager') {
          return true;
        }
      }
    } else {
      console.error('Token is null');
    }
    return false;
  }
  openModal(content: any) {
    const modalOptions: NgbModalOptions = {
      centered: true,
      size: 'lg'
    };

    this.modalContent = content; // Set the content for the modal

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
}