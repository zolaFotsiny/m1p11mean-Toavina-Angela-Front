import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../home/header/header.component';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { CalendarRendezVousComponent } from './calendar-rendez-vous/calendar-rendez-vous.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RendezvousAddComponent } from './rendezvous/rendezvous-add/rendezvous-add.component';
import { FavorisComponent } from './favoris/favoris.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CalendarRendezVousComponent, CommonModule, RendezvousAddComponent, RouterModule, FavorisComponent, RouterOutlet],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  @ViewChild('content') content: any; // Declare the template reference variable
  modalContent: any; // Property to store the modal content

  email: string = '';
  nom: string = '';
  id: string = '';
  prenom: string = '';
  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {
    let userToken = localStorage.getItem('token');
    const infoUser: any = jwtDecode(userToken ?? "");
    console.log('huhuhuhu_', infoUser);
    this.email = infoUser.email;
    this.nom = infoUser.nom;
    this.prenom = infoUser.prenom;
    this.id = infoUser.id;
  }











  openModal(content: any) {
    // alert(content)
    const modalOptions: NgbModalOptions = {
      centered: true,
      size: 'lg'
    };

    this.modalContent = content; // Set the content for the modal

    const modalRef = this.modalService.open(this.content, modalOptions);

    modalRef.result.then(
      (result) => {
        // Handle modal close
      },
      (reason) => {
        // Handle modal dismiss
      }
    );
  }
}
