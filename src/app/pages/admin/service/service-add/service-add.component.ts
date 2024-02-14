import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-service-add',
  standalone: true,
  imports: [NzFormModule, NzInputModule, ReactiveFormsModule, CommonModule, NzButtonModule],
  templateUrl: './service-add.component.html',
  styleUrl: './service-add.component.scss'
})
export class ServiceAddComponent {
  validateForm: FormGroup<{
    nom: FormControl<string>;
    prenom: FormControl<string>;
    email: FormControl<string>;
    mot_de_passe: FormControl<string>;
    type_utilisateur: FormControl<string>;
    confirm: FormControl<string>;
  }>;


  submitForm(): void {
    console.log('submit', this.validateForm.value);
    // You can send the form data to your API here
  }


  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  // Update the async validator for the 'nom' field if needed
  nomAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      // Your validation logic here
      observer.next(null);
      observer.complete();
    });

  // Add async validators for other fields if needed

  confirmPasswordValidator: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.mot_de_passe.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(private fb: NonNullableFormBuilder, private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      nom: ['', [Validators.required], [this.nomAsyncValidator]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      type_utilisateur: ['employee', [Validators.required]], // Assuming a default value
      confirm: ['', [this.confirmPasswordValidator]]
    });
  }


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
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Success',
      'Nouvelle service ajouter .',
      { nzPlacement: 'topRight' }
    );
  }
}
