import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../../app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-fiche',
  standalone: true,
  imports: [],
  templateUrl: './client-fiche.component.html',
  styleUrl: './client-fiche.component.scss'
})
export class ClientFicheComponent implements OnInit {

  @Input() clientId!: string;

  client: any;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    public activeModal: NgbActiveModal // Injection de NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.clientId !== null) {
      this.servicesService.findClientById(this.clientId).subscribe(
        data => {
          console.log("ggggggggggggggggggggggg", data.data);
          this.client = data.data;
          console.log(this.client);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Error: id is null');
    }

  }
}

