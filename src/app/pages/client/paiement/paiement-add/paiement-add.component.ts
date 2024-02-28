import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../../app.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement-add.component.html',
  styleUrl: './paiement-add.component.scss'

})
export class PaiementAddComponent implements OnInit {
  paiement: any;

  constructor(private route: ActivatedRoute, private servicesService: ServicesService, private notification: NzNotificationService) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    if (id !== null) {
      this.servicesService.payerRdv(id).subscribe(
        data => {
          this.paiement = data.paiement;
        },
        error => {
          console.error('Erreur lors du paiement:', error);
        }
      );
    } else {
      // Gérer le cas où l'ID est null
      console.error('ID is null');
    }
  }

  validerPaiement() {
    this.servicesService.validerPaiement(this.paiement._id).subscribe(
      data => {
        console.log('Paiement validé avec succès:', data);
        this.notification.create(
          'success',
          'Validation du paiement',
          'Le paiement a été validé avec succès.'
        );
      },
      error => {
        console.error('Erreur lors de la validation du paiement:', error);
        this.notification.create(
          'error',
          'Validation du paiement',
          'Une erreur est survenue lors de la validation du paiement.'
        );
      }
    );
  }
}
