import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../app.service';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement-add.component.html',
  styleUrl: './paiement-add.component.scss'

})
export class PaiementAddComponent implements OnInit {
  paiement: any;

  constructor(private route: ActivatedRoute, private servicesService: ServicesService) { }

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
}
