import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../../app.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';






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

  constructor(private servicesService: ServicesService) { }

  reset(): void {
    this.searchValue = '';
    this.search();
  }



  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: EmployeeItem) => {
      const user = item.id_utilisateur;
      if (user) {
        const nom = user.nom.toLowerCase().includes(this.searchValue.toLowerCase())
      }
    });
  }
  ngOnInit(): void {
    console.log('ngOnInit called');

    this.servicesService.getEmployees().subscribe(
      (response: any) => {
        console.log('Raw response:', response);
        if (response && response.data) {
          this.listOfData = response.data.map((item: any) => {
            const employeeItem: EmployeeItem = {
              _id: item._id,
              date_creation: item.date_creation,
              id_utilisateur: {
                _id: item.id_utilisateur?._id || '',
                nom: item.id_utilisateur?.nom || '',
                prenom: item.id_utilisateur?.prenom || '',
                email: item.id_utilisateur?.email || '',
                mot_de_passe: item.id_utilisateur?.mot_de_passe || '',
                type_utilisateur: item.id_utilisateur?.type_utilisateur || '',
              },
            };
            return employeeItem;
          });
          this.listOfDisplayData = [...this.listOfData];
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

}
