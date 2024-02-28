import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../../app.service';

@Component({
  selector: 'app-paiement-valid',
  standalone: true,
  imports: [],
  templateUrl: './paiement-valid.component.html',
  styleUrl: './paiement-valid.component.scss'
})
export class PaiementValidComponent implements OnInit {
  paiement: any;

  constructor(private route: ActivatedRoute, private servicesService: ServicesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.servicesService.validerPaiement(id).subscribe(
        data => {
          this.paiement = data.paiement;
        },
        error => {
          console.error('Erreur lors de la validation du paiement:', error);
        }
      );
    } else {
      console.error('ID is null');
    }
  }
}