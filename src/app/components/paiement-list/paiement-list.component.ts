import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-paiement-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    HttpClientModule, NzTableModule,
    NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule, NzButtonModule],
  templateUrl: './paiement-list.component.html',
  styleUrl: './paiement-list.component.scss'
})
export class PaiementListComponent implements OnInit {
  paiements: any[] = [];
  filteredPaiements: any[] = [];
  isLoading = false;
  searchFields = {
    montant_total: '',
    date_paiement: '',
    mode_paiement: '',
    etat: ''
  };

  visibleMontantTotal = false;
  visibleDatePaiement = false;
  visibleModePaiement = false;
  visibleEtat = false;

  constructor(private servicesService: ServicesService) { }






  ngOnInit(): void {
    this.isLoading = true;
    this.servicesService.getPaiement().subscribe(
      (response: any) => {
        this.paiements = response.data;
        this.filteredPaiements = [...this.paiements]; // Initialize filteredPaiements with all paiements
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
        this.isLoading = false;
      }
    );
  }

  resetMontantTotal(): void {
    this.searchFields.montant_total = '';
    this.searchMontantTotal();
  }

  searchMontantTotal(): void {
    this.filteredPaiements = this.paiements.filter(paiement =>
      paiement.montant_total.toString().includes(this.searchFields.montant_total)
    );
  }

  resetDatePaiement(): void {
    this.searchFields.date_paiement = '';
    this.searchDatePaiement();
  }

  searchDatePaiement(): void {
    this.filteredPaiements = this.paiements.filter(paiement =>
      paiement.date_paiement.toString().includes(this.searchFields.date_paiement)
    );
  }

  resetModePaiement(): void {
    this.searchFields.mode_paiement = '';
    this.searchModePaiement();
  }

  searchModePaiement(): void {
    this.filteredPaiements = this.paiements.filter(paiement =>
      paiement.mode_paiement.toString().includes(this.searchFields.mode_paiement)
    );
  }

  resetEtat(): void {
    this.searchFields.etat = '';
    this.searchEtat();
  }

  searchEtat(): void {
    this.filteredPaiements = this.paiements.filter(paiement =>
      paiement.etat.toString().includes(this.searchFields.etat)
    );
  }
}
