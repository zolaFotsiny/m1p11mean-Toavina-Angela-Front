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

// import { ServicesService } from '../../app.service';
// import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
@Component({
  selector: 'app-service-add',
  standalone: true,
  imports: [NzIconModule, NzFormModule, NzUploadModule, NzInputModule, ReactiveFormsModule, CommonModule, NzButtonModule, NzInputNumberModule],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent {
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceService: ServicesService) {
    this.serviceForm = this.fb.group({
      designation: ['', Validators.required],
      prix: ['', Validators.required],
      duree: ['', Validators.required],
      commission_pourcentage: ['', Validators.required],
      file: [null, Validators.required], // Use 'file' as the field name for the file
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
    console.log('Form submitted'); // Ajout d'un log pour vérifier que la méthode est appelée
    if (this.serviceForm.valid) {
      console.log('Form is valid'); // Ajout d'un log pour vérifier que le formulaire est valide
      const formData = new FormData();
      formData.append('designation', this.serviceForm.value.designation);
      formData.append('prix', this.serviceForm.value.prix);
      formData.append('duree', this.serviceForm.value.duree);
      formData.append('commission_pourcentage', this.serviceForm.value.commission_pourcentage);
      formData.append('file', this.serviceForm.value.file);
      console.log('Form data:', formData); // Ajout d'un log pour vérifier les données du formulaire
      console.log('Form values:', this.serviceForm.value);
      this.serviceService.createService(formData).subscribe(
        (response) => {
          console.log('Response:', response); // Ajout d'un log pour vérifier la réponse du serveur
        },
        (error) => {
          console.error('Error:', error); // Ajout d'un log pour vérifier les erreurs du serveur
        }
      );
    } else {
      console.log('Form is invalid'); // Ajout d'un log pour vérifier que le formulaire n'est pas valide
    }
  }




}