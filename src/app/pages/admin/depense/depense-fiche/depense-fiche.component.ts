import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../../app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-depense-fiche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './depense-fiche.component.html',
  styleUrl: './depense-fiche.component.scss'
})
export class DepenseFicheComponent implements OnInit {

  @Input() depId!: string;

  depense: any;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    public activeModal: NgbActiveModal,
    private notification: NzNotificationService
  ) { }



  ngOnInit(): void {
    if (this.depId !== null) {
      this.servicesService.findFicheDepenseById(this.depId).subscribe(
        data => {
          console.log("ggggggggggggggggggggggg", data.data);
          this.depense = data.data;
          console.log(this.depense);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Error: id is null');
    }

  }
  validerDepense(id: string): void {
    this.servicesService.validerDepense(id).subscribe(
      response => {
        // Gérer la réponse du serveur
        console.log('Dépense validée avec succès:', response);
        this.notification.create(
          'success',
          'Succès',
          'La dépense a été validée avec succès.'
        );
        this.activeModal.close();
      },
      error => {
        // Gérer l'erreur
        console.error('Erreur lors de la validation de la dépense:', error);
        this.notification.create(
          'error',
          'Erreur',
          'Une erreur est survenue lors de la validation de la dépense.'
        );
      }
    );
  }
}