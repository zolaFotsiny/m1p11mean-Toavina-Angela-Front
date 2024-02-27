import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../app.service';

@Component({
  selector: 'app-client-fiche',
  standalone: true,
  imports: [],
  templateUrl: './client-fiche.component.html',
  styleUrl: './client-fiche.component.scss'
})
export class ClientFicheComponent implements OnInit {
  client: any;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.servicesService.findClientById(id).subscribe(
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

