import { CommonModule } from '@angular/common';
import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ServicesService } from '../../../../app.service';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  templateUrl: './rendezvous-add.component.html',
  styleUrls: ['./rendezvous-add.component.scss']
})
export class RendezvousAddComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  @Output() newRendezvousAdded = new EventEmitter<any>();
  listOfSelectedValue: Array<{ _id: string; designation: string }> = [];
  listOfSelectedValueEmp: Array<{ _id: string; designation: string }> = [];
  listOfTagOptions: Array<{ _id: string; designation: string }> = []; // Define the correct type here
  listOfTagOptionsEmp: Array<{ _id: string; designation: string }> = []; // Define the correct type here
  selectedValue = 'Default';

  constructor(private modalService: NgbModal, private fb: FormBuilder, private serviceService: ServicesService, private notification: NzNotificationService) { }




  ngOnInit(): void {
    this.serviceService.getServices().subscribe(
      (response: any) => {
        if (response && response.data) {
          const data = response.data as Option[];
          this.listOfSelectedValue = data.map(option => ({
            designation: option.designation,
            _id: option._id
          }));
        }
      },
      (error) => {
        console.error('Error fetching services:', error);
      }
    );



    this.serviceService.getEmployees().subscribe(

      (response: any) => {
        console.log('employeee:');
        if (response && response.data) {
          const data = response.data as Optione[];

          this.listOfSelectedValueEmp = data.map(optione => ({
            designation: optione.id_utilisateur.nom,
            _id: optione._id
          }));
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
        this.createChoiceFormGroup('', ''), // Initialise the first form group in the array
      ]),
      remarque: ['', Validators.required],
      date_heure: ['', Validators.required],
      etat: [1, Validators.required]
    });
  }


  createChoiceFormGroup(service: string, employee: string): FormGroup {
    return this.fb.group({
      id_service: [service, Validators.required],
      id_employee: [employee, Validators.required],
    });
  }

  addChoiceRow() {
    const newChoiceFormGroup = this.createChoiceFormGroup('', ''); // Pass initial values if needed
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


  onSubmit() {

    console.log(JSON.stringify(this.myForm.value));

    const formDataAsJson = JSON.stringify(this.myForm.value);
    console.log('submit', formDataAsJson);

    this.serviceService.addrendezvous(formDataAsJson).subscribe(
      response => {

        this.notification.success('Succès', 'RDV enregistré avec succès');
        this.newRendezvousAdded.emit(response.data);
        this.myForm.reset();
        this.modalService.dismissAll();
      },
      error => {
        console.error('Error registering user:', error);
        this.notification.error('Erreur', 'Une erreur s\'est produite lors de l\'enregistrement du RDV');
      }

    );




  };
}