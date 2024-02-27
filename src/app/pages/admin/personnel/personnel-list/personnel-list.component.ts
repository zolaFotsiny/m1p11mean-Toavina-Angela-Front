import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../../app.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFicheComponent } from '../employee-fiche/employee-fiche.component';






interface EmployeeItem {
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
  selector: 'app-personnel-list',
  standalone: true,
  imports: [NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule],
  templateUrl: './personnel-list.component.html',
  styleUrl: './personnel-list.component.scss'
})
export class PersonnelListComponent implements OnInit {
  searchValue = '';
  visible = false;
  isLoading = true;
  listOfData: EmployeeItem[] = [];
  listOfDisplayData: EmployeeItem[] = [];
  modalRef: NgbModalRef | null = null;
  constructor(private servicesService: ServicesService, private router: Router, private modalService: NgbModal) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }



  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: EmployeeItem) => {
        if (item.id_utilisateur) {
          return item.id_utilisateur.nom.toLowerCase().includes(this.searchValue.toLowerCase());
        }
        return false;
      }
    );
  }

  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getEmployees().subscribe(
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


  openModalEmpFiche(empId: string): void {
    console.log(empId);
    this.modalRef = this.modalService.open(EmployeeFicheComponent);
    if (this.modalRef) { // Check if modalRef is not null
      this.modalRef.componentInstance.empId = empId;
    }
  }

}
