import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from '../FORM/DynamicFormComponent'; // Corrected path

@Component({
  selector: 'app-service-add', // Assuming this is the correct selector
  template: `
    <div>
      <h1>Dynamic Form Example</h1>
      <dynamic-form [controls]="formControls"></dynamic-form> // Corrected selector
    </div>
  `,
})
export class ServiceAddComponent {
  formControls = [
    // Array of control definitions for your form
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      validators: [Validators.required],
      // ... other control properties
    },
    // ... other controls
  ];

  // ngOnInit() { // Not needed if you provide controls directly
  //   this.formControls = [...];
  // }
}
