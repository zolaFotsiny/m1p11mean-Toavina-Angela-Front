import { Component } from '@angular/core';
import { ServicesService } from '../../app.service';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.scss'
})
export class ServiceCreateComponent {

  designation = ''
  prix = 0
  duree = 0
  commission_pourcentage = 0
  file = ''

  constructor(private servicesService: ServicesService) { }

  createService(): void {
    const formData = new FormData();
    formData.append('designation', this.designation);
    formData.append('prix', String(this.prix));
    formData.append('duree', String(this.duree));
    formData.append('commission_pourcentage', String(this.commission_pourcentage));
    formData.append('file', this.file);

    this.servicesService.createService(formData)
      .pipe(
        catchError(error => {
          // Handle error, display error message, etc.
          console.error('Error creating service', error);
          return [];
        })
      )
      .subscribe(
        response => {
          console.log('Service created successfully', response);
          // Handle success, update UI or perform additional actions
        }
      );
  }

  onFileSelected(event: any): void {
    // Handle file selection logic here
    // For example, you can access the selected file using event.target.files[0]
    this.file = event.target.files[0];
  }

}
