import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ServicesService } from '../../../app.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

interface Option {
  _id: any;
  designation: any;
  // Add more properties if needed
}

interface Optione {
  _id: any;
  id_utilisateur: {
    nom: string;
    // Add more properties if needed
  };
  // Add more properties if needed
}

@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [NzSelectModule, CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule],
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.scss']
})
export class RendezvousComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  listOfSelectedValue: Array<{ _id: string; designation: string }> = [];
  listOfSelectedValueEmp: Array<{ _id: string; designation: string }> = [];
  listOfTagOptions: Array<{ _id: string; designation: string }> = []; // Define the correct type here
  listOfTagOptionsEmp: Array<{ _id: string; designation: string }> = []; // Define the correct type here
  selectedValue = 'Default';

  constructor(private fb: FormBuilder, private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        if (response && response.data) {
          const data = response.data as Option[];
          console.error('Invalid response structure:', data);
          this.listOfSelectedValue = data.map(option => ({
            designation: option.designation,
            _id: option._id
          }));
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );



    this.serviceService.getEmployees().subscribe(
      (response: any) => {
        if (response && response.data) {
          const data = response.data as Optione[];
          console.error('Invalid response structure:', data);
          this.listOfSelectedValueEmp = data.map(optione => ({
            designation: optione.id_utilisateur.nom,
            _id: optione._id
          }));
        } else {
          console.error('Invalid response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );



    const staticOptions: Array<{ _id: string; designation: string }> = [];
    for (let i = 10; i < 36; i++) {
      staticOptions.push({ _id: i.toString(36) + i, designation: i.toString(36) + i });
    }
    const staticOptionsEmp: Array<{ _id: string; designation: string }> = [];
    for (let i = 10; i < 36; i++) {
      staticOptionsEmp.push({ _id: i.toString(36) + i, designation: i.toString(36) + i });
    }
    // Combining static and dynamic options
    this.listOfTagOptions = [...staticOptions, ...this.listOfSelectedValue];
    this.listOfTagOptionsEmp = [...staticOptionsEmp, ...this.listOfSelectedValueEmp];

    this.myForm = this.fb.group({
      id_client: ['', Validators.required],
      choix: this.fb.array([
        this.createChoiceFormGroup('', ''),
        // Add more static choices as needed
      ]),
      date_heure: ['', Validators.required],
      etat: [1, Validators.required]
    });
  }

  addChoiceRow() {
    const newChoiceFormGroup = this.createChoiceFormGroup('', ''); // You can pass initial values if needed
    (this.myForm.get('choix') as FormArray).push(newChoiceFormGroup);
  }


  removeChoiceRow(index: number) {
    (this.myForm.get('choix') as FormArray).removeAt(index);
  }
  onTagOptionChange(event: any, index: number) {
    // Handle the change logic here
    // For example, you can update the value in the form control
    const selectedOption = this.listOfTagOptions[index];
    this.myForm.get(`choix.${index}._id`)!.setValue(selectedOption._id);

  }

  getChoixControls(): AbstractControl[] {
    return (this.myForm.get('choix') as FormArray)?.controls || [];
  }

  // Helper method to create a FormGroup for choices
  createChoiceFormGroup(serviceValue: string, employeeValue: string): FormGroup {
    return this.fb.group({
      id_service: [serviceValue, Validators.required],
      id_employee: [employeeValue]
    });
  }

  // Add more helper methods as needed for dynamic form manipulation

  // Handle form submission
  onSubmit() {
    // Access the form values using this.myForm.value
    console.log(JSON.stringify(this.myForm.value));

    const formDataAsJson = JSON.stringify(this.myForm.value);
    console.log('submit', formDataAsJson);

    // Check if the form is valid

    // Call the registerUser method from ServicesService
    this.serviceService.addrendezvous(formDataAsJson).subscribe(
      response => {
        // Handle successful registration
        console.log('User registered successfully:', Response); // change 'response' to 'Response'
        // You can also reset the form here if needed
        this.myForm.reset();
      },
      error => {
        // Handle registration error
        console.error('Error registering user:', error);
      }
    );




  };
}