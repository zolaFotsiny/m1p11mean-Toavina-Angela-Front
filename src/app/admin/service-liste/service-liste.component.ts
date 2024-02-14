// service-liste.component.ts

import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicesService } from '../../app.service';
import { NzModalService } from 'ng-zorro-antd/modal'; // Import NzModalService

interface ServiceItem {
  _id: string;
  designation: string;
  prix: number;
  duree: number;
  commission_pourcentage: number;
  date_insertion: string;
  etat: boolean;
  image: string;
}

@Component({
  selector: 'app-service-liste',
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
  templateUrl: './service-liste.component.html',
  styleUrls: ['./service-liste.component.scss'],
})
export class ServiceListeComponent implements OnInit {
  searchValue = '';
  visible = false;
  isLoading = true;
  listOfData: ServiceItem[] = [];
  listOfDisplayData: ServiceItem[] = [];

  constructor(private servicesService: ServicesService) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: ServiceItem) =>
        item.designation.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getServices().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          this.listOfData = response.data;
          this.listOfDisplayData = [...this.listOfData]; // Initialize listOfDisplayData with all services
          console.log('Services:', this.listOfData);
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
}
