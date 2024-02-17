import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
// Import the necessary NgZorro Ant Design modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import FormsModule and ReactiveFormsModule
@Component({
  selector: 'app-service-add',
  standalone: true,
  templateUrl: './service-add.component.html',
  imports: [NzFormModule,
    NzInputModule,
    NzButtonModule,
    CommonModule,  // Add CommonModule
    FormsModule,   // Add FormsModule
    ReactiveFormsModule,  // Add ReactiveFormsModule
    NzNotificationModule,
  ],
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  validateForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    designation: [null, [Validators.required]], // You can adjust the validation as needed
    // Add other form controls for prix, duree, commission_pourcentage, image, etc.
  });

  isLoadingTwo = false;

  constructor(private fb: FormBuilder, private notification: NzNotificationService) { }

  ngOnInit(): void {
    // You can keep ngOnInit logic here if needed
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
    if (this.validateForm.valid) {
      // Form is valid, proceed with submission
      const formData = this.validateForm.value;
      // Handle form data as needed

      // Example of using the notification service
      this.createNotification('success', 'Nouvelle service ajoutée.');
    } else {
      // Form is invalid, highlight errors or take appropriate action
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
      this.createNotification('success', 'Nouvelle service ajoutée.');
    }, 2000);
  }

  createNotification(type: string, message: string): void {
    this.notification.create(
      type,
      'Success',
      message,
      { nzPlacement: 'topRight' }
    );
  }
}
