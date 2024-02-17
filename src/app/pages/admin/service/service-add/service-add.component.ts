import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  validateForm: FormGroup = this.fb.group({
    designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    prix: ['', [Validators.pattern(/^[1-9]\d*$/), Validators.required]],
    duree: ['', Validators.required],
    commission_pourcentage: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
  });

  constructor(private servicesService: ServicesService, private fb: NonNullableFormBuilder, private notification: NzNotificationService, private msg: NzMessageService) {
    // this.validateForm = this.fb.group({
    //   designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    //   prix: ['', [Validators.pattern(/^[1-9]\d*$/), Validators.required]],
    //   duree: ['', Validators.required],
    //   commission_pourcentage: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    // image: ['', [Validators.required]],
    // });
  }

  file!: File; // Non-null assertion
  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.file = selectedFile;
      // You can perform additional actions with the selected file here
    }
  }
  async submitForm(): Promise<void> {

    if (this.validateForm.valid) {
      if (this.file) {
        let data = this.validateForm.value;
        data.file = this.file
        try {
          const response = await this.servicesService.createService(data).toPromise();
          console.log('Service registered successfully:', response);
          this.validateForm.reset();
          this.loadTwo();
        } catch (error) {
          console.error('Error registering service:', error);
        }
      } else {
        this.createNotification('error');
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }
  //managing button
  isLoadingOne = false;
  isLoadingTwo = false;
  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 2000);
  }

  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
      this.createNotification('success')
    }, 2000);
  }
  //notification success
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Success',
      'Nouvelle service ajouter .',
      { nzPlacement: 'topRight' }
    );
  }
}
