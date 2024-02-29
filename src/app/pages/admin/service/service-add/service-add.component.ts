import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicesService } from '../../../../app.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-service-add',
  standalone: true,
  imports: [
    NzButtonModule,
    NzSpinModule,
    NzSpinModule, NzIconModule, NzFormModule, NzUploadModule, NzInputModule, ReactiveFormsModule, CommonModule, NzButtonModule, NzInputNumberModule],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent {
  serviceForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private serviceService: ServicesService, private notification: NzNotificationService) {
    this.serviceForm = this.fb.group({
      designation: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission_pourcentage: ['', Validators.required],
      file: [null, Validators.required], // Use 'file' as the field name for the file
      isOffreSpeciale: [false], // Field for special offer status
      dateDebut: [null], // Field for the start date of the special offer
      dateFin: [null], // Field for the end date of the special offer
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.serviceForm.patchValue({ file });
    }
  }

  onSubmit(): void {
    console.log('Form submitted');
    if (this.serviceForm.valid) {
      console.log('Form is valid');

      // Activer le chargement
      this.loading = true;

      const formData = new FormData();
      formData.append('designation', this.serviceForm.value.designation);
      formData.append('prix', this.serviceForm.value.prix);
      formData.append('duree', this.serviceForm.value.duree);
      formData.append('commission_pourcentage', this.serviceForm.value.commission_pourcentage);
      formData.append('file', this.serviceForm.value.file);
      formData.append('isOffreSpeciale', this.serviceForm.value.isOffreSpeciale);
      if (this.serviceForm.value.isOffreSpeciale === 'true') {
        formData.append('dateDebut', this.serviceForm.value.dateDebut);
        formData.append('dateFin', this.serviceForm.value.dateFin);
      }

      console.log('Form data:', formData);
      console.log('Form values:', this.serviceForm.value);

      this.serviceService.createService(formData).subscribe(
        (response) => {
          console.log('Response:', response);
          this.notification.create(
            'success',
            'Success',
            'Opération réussie.',
            { nzPlacement: 'bottomRight' }
          );

          // Désactiver le chargement après la réponse du serveur
          this.loading = false;
        },
        (error) => {
          console.error('Error:', error);

          // Désactiver le chargement en cas d'erreur du serveur
          this.loading = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
