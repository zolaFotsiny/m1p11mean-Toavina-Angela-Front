import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { ServicesService } from '../../../../app.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-depense-add',
  standalone: true,
  imports: [
    NzButtonModule, NzIconModule, NzFormModule, NzInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './depense-add.component.html',
  styleUrl: './depense-add.component.scss'
})
export class DepenseAddComponent implements OnInit {
  depenseForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private servicesService: ServicesService, private notification: NzNotificationService) {
    // Initialiser depenseForm dans le constructeur
    this.depenseForm = this.formBuilder.group({
      designation: ['', Validators.required],
      montant_total: ['', Validators.required],
      mode_depense: ['', Validators.required],
      details: this.formBuilder.array([])
    });
  }

  get details() {
    return this.depenseForm.get('details') as FormArray;
  }

  addDetail(): void {
    this.details.push(this.formBuilder.group({
      designation: ['', Validators.required],
      montant: ['', Validators.required]
    }));
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.depenseForm.valid) {
      return;
    }
    this.loading = true;
    const formData = this.depenseForm.value;

    this.servicesService.createDepense(formData).subscribe(
      (response) => {
        console.log('Response:', response);
        this.notification.create(
          'success',
          'Success',
          'Opération réussie.',
          { nzPlacement: 'bottomRight' }
        );
        this.loading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    );
  }
}
