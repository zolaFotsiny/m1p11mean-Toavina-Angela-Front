import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicesService } from '../../../../app/app.service';

interface CommissionItem {
  _id: string;
  id_employee: {
    _id: string;
    id_utilisateur: {
      _id: string;
      nom: string;
      prenom: string;
      email: string;
      type_utilisateur: string;
    };
    date_creation: string;
  };
  id_tache: {
    _id: string;
    id_employee: string;
    id_service: string;
    id_rendezvous: string;
    date_debut: string;
    etat: number;
    date_fait: string;
  };
  montant: number;
  date: string;
  etat: number;
}

@Component({
  selector: 'app-commission',
  standalone: true,
  imports: [
    NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule
  ],
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent {
  searchValueNom = '';
  visibleNom = false;
  searchValuePrenom = '';
  visiblePrenom = false;
  searchValueEmail = '';
  visibleEmail = false;
  searchValueTache = '';
  visibleTache = false;
  searchValueCommission = '';
  visibleCommission = false;
  isLoading = true;
  listOfData: CommissionItem[] = [];
  listOfDisplayData: CommissionItem[] = [];

  constructor(private servicesService: ServicesService) { }

  resetNom(): void {
    this.searchValueNom = '';
    this.searchNom();
  }

  searchNom(): void {
    this.visibleNom = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: CommissionItem) =>
        item.id_employee.id_utilisateur.nom.toLowerCase().includes(this.searchValueNom.toLowerCase())
    );
  }

  resetPrenom(): void {
    this.searchValuePrenom = '';
    this.searchPrenom();
  }

  searchPrenom(): void {
    this.visiblePrenom = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: CommissionItem) =>
        item.id_employee.id_utilisateur.prenom.toLowerCase().includes(this.searchValuePrenom.toLowerCase())
    );
  }

  resetEmail(): void {
    this.searchValueEmail = '';
    this.searchEmail();
  }

  searchEmail(): void {
    this.visibleEmail = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: CommissionItem) =>
        item.id_employee.id_utilisateur.email.toLowerCase().includes(this.searchValueEmail.toLowerCase())
    );
  }

  resetTache(): void {
    this.searchValueTache = '';
    this.searchTache();
  }

  searchTache(): void {
    this.visibleTache = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: CommissionItem) =>
        item.id_tache._id.toLowerCase().includes(this.searchValueTache.toLowerCase())
    );
  }

  resetCommission(): void {
    this.searchValueCommission = '';
    this.searchCommission();
  }

  searchCommission(): void {
    this.visibleCommission = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: CommissionItem) =>
        item._id.toLowerCase().includes(this.searchValueCommission.toLowerCase())
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getComissions().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          this.listOfData = response.data;
          this.listOfDisplayData = [...this.listOfData]; // Initialize listOfDisplayData with all commissions
          console.log('Commissions:', this.listOfData);
        } else {
          console.error('Invalid response structure:', response);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching commissions:', error);
        this.isLoading = false;
      }
    );
  }
}
