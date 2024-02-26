import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ServicesService } from '../../app.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { CommonModule } from '@angular/common';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-rendez-vous-fiche',
  standalone: true,
  imports: [NzTableModule,
    NzSpinModule,
    NzDividerModule,
    CommonModule,
    NzDropDownModule,
    FormsModule,
    NzIconModule, RouterModule],
  templateUrl: './rendez-vous-fiche.component.html',
  styleUrl: './rendez-vous-fiche.component.scss'
})

export class RendezVousFicheComponent implements OnInit {
  rendezvous: any;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.servicesService.findRdvById(id).subscribe(
        data => {
          this.rendezvous = data.data;
          console.log(this.rendezvous);
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

