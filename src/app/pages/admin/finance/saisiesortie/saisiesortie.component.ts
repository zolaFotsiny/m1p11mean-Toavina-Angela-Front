import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sortie-form',
  standalone: true,
  imports: [
    // ... autres modules
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './saisiesortie.component.html',
  styleUrls: ['./saisiesortie.component.scss'],
})
export class SaisiesortieComponent implements OnInit {
  sortieForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder) {
    // Initialisez sortieForm dans le constructeur
    this.sortieForm = this.formBuilder.group({
      libele: ['', Validators.required],
      description: ['', Validators.required],
      montant: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.sortieForm.valid) {
      // Effectuez ici le traitement de soumission
      // Afficher les données du formulaire dans la console
      console.log('Données du formulaire :', this.sortieForm.value);
      this.loading = true;
      // Simulez un délai avant de réinitialiser le formulaire et le chargement
      setTimeout(() => {
        this.sortieForm.reset();
        this.loading = false;
      }, 2000);
    }
  }
}
