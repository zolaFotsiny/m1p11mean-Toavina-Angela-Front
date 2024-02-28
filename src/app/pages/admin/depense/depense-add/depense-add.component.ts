import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  depenseForm: FormGroup = new FormGroup({
    'designation': new FormControl(null, Validators.required),
    'montant_total': new FormControl(null, Validators.required),
    'mode_paiement': new FormControl(null, Validators.required)
  });
  loading = false;

  constructor(private servicesService: ServicesService, private notification: NzNotificationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.depenseForm.valid) {
      return;
    }
    this.loading = true;
    const formData = {
      'designation': this.depenseForm.value.designation,
      'montant_total': this.depenseForm.value.montant_total,
      'mode_paiement': this.depenseForm.value.mode_paiement
    };

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