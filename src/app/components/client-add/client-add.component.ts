import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../app.service';
@Component({
  selector: 'app-client-add',
  standalone: true,
  imports: [NzFormModule, NzInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.scss'
})
export class ClientAddComponent {
  validateForm: FormGroup<{
    nom: FormControl<string>;
    prenom: FormControl<string>;
    email: FormControl<string>;
    mot_de_passe: FormControl<string>;
    type_utilisateur: FormControl<string>;
    confirm: FormControl<string>;
  }>;


  submitForm(): void {
    const formDataAsJson = JSON.stringify(this.validateForm.value);
    console.log('submit', formDataAsJson);

    // Check if the form is valid
    if (this.validateForm.valid) {
      // Call the registerUser method from ServicesService
      this.servicesService.registerUser(formDataAsJson).subscribe(
        response => {
          // Handle successful registration
          console.log('User registered successfully:', Response); // change 'response' to 'Response'
          // You can also reset the form here if needed
          this.validateForm.reset();
        },
        error => {
          // Handle registration error
          console.error('Error registering user:', error);
        }
      );
    }
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

  constructor(private fb: NonNullableFormBuilder, private servicesService: ServicesService) {
    this.validateForm = this.fb.group({
      nom: ['', [Validators.required], [this.nomAsyncValidator]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      type_utilisateur: ['employee', [Validators.required]], // Assuming a default value
      confirm: ['', [this.confirmPasswordValidator]]
    });
  }
}