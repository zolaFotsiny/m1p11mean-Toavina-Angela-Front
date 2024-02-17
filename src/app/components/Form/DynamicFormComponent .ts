// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//     selector: 'app-dynamic-form',
//     template: `
//     <form [formGroup]="formGroup">
//       <div *ngFor="let control of controls">
//         <label>{{ control.label }}</label>
//         <input [formControlName]="control.name" [placeholder]="control.placeholder" />
//         <div *ngIf="hasError(control.name)" class="error-message">{{ getErrorMessage(control.name) }}</div>
//       </div>
//     </form>
//   `,
//     styles: [
//         `
//       .error-message {
//         color: red;
//         margin-top: 4px;
//       }
//     `,
//     ],
// })
// export class DynamicFormComponent implements OnInit {
//     @Input() controls: any[] = [];

//     formGroup: FormGroup = new FormGroup({}); // Initialize the formGroup

//     constructor(private fb: FormBuilder) { }

//     ngOnInit(): void {
//         const formGroupConfig: { [key: string]: any } = {};
//         this.controls.forEach((control) => {
//             formGroupConfig[control.name] = [
//                 '',
//                 control.validators ? control.validators : [],
//             ];
//         });
//         this.formGroup = this.fb.group(formGroupConfig);
//     }

//     hasError(controlName: string): boolean {
//         const control = this.formGroup.get(controlName);
//         return control !== null && control !== undefined && control.dirty && control.invalid;
//     }

//     getErrorMessage(controlName: string): string {
//         const control = this.formGroup.get(controlName);
//         if (control) {
//             for (const key in control.errors) {
//                 if (control.errors.hasOwnProperty(key)) {
//                     const message = control.errors[key];
//                     return message ? message : 'Validation error';
//                 }
//             }
//         }
//         return 'Validation error';
//     }
// }

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    template: `
    <form [formGroup]="formGroup">
      <div *ngFor="let control of controls">
        <label>{{ control.label }}</label>
        <input [formControlName]="control.name" [placeholder]="control.placeholder" />
        <div *ngIf="hasError(control.name)" class="error-message">{{ getErrorMessage(control.name) }}</div>
      </div>
    </form>
  `,
    styles: [
        `
      .error-message {
        color: red;
        margin-top: 4px;
      }
    `,
    ],
})

export class DynamicFormComponent implements OnInit {
    @Input() controls: any[] = []; // Array of control definitions
    formGroup: FormGroup = new FormGroup({}); // Reactive form

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        const formGroupConfig: { [key: string]: any } = {};
        this.controls.forEach((control) => {
            formGroupConfig[control.name] = [
                '',
                control.validators ? control.validators : [],
            ];
        });
        this.formGroup = this.fb.group(formGroupConfig);
    }

    hasError(controlName: string): boolean {
        const control = this.formGroup.get(controlName);
        return control !== null && control !== undefined && control.dirty && control.invalid;
    }

    getErrorMessage(controlName: string): string {
        const control = this.formGroup.get(controlName);
        if (control) {
            for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                    const message = control.errors[key];
                    return message ? message : 'Validation error';
                }
            }
        }
        return 'Validation error';
    }
}
