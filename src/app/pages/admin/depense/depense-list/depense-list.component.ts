import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzModalService } from 'ng-zorro-antd/modal';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ServicesService } from '../../../../app.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DepenseFicheComponent } from '../depense-fiche/depense-fiche.component';

interface DepenseItem {
  _id: string;
  designation: string;
  montant_total: number;
  date_depense: Date;
  mode_depense: string;
  etat: any;
  details: any[];
}
@Component({
  selector: 'app-depense-list',
  standalone: true,
  imports: [NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule],
  templateUrl: './depense-list.component.html',
  styleUrl: './depense-list.component.scss'
})
export class DepenseListComponent implements OnInit {
  searchValue = '';
  visible = false;
  isLoading = true;
  listOfData: DepenseItem[] = [];
  listOfDisplayData: DepenseItem[] = [];
  modalRef: NgbModalRef | null = null;
  constructor(private servicesService: ServicesService, private router: Router, private modalService: NgbModal, private notification: NzNotificationService) { }



  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: DepenseItem) =>
        item.designation.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getDepenses().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          this.listOfData = response.data;
          this.listOfDisplayData = [...this.listOfData];
          console.log('Depenses:', this.listOfData);
        } else {
          console.error('Invalid response structure:', response);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching depenses:', error);
        this.isLoading = false;
      }
    );
  }

  viewFiche(depId: string): void {
    console.log(depId);
    this.modalRef = this.modalService.open(DepenseFicheComponent);
    if (this.modalRef) { // Check if modalRef is not null
      this.modalRef.componentInstance.depId = depId;
    }
  }



}