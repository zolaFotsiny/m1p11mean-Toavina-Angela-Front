import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../home/header/header.component';
import { JwtPayload, jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {
  email: string = '';
  nom: string = '';
  id: string = '';
  prenom: string = '';



  ngOnInit(): void {
    let userToken = localStorage.getItem('token');
    const infoUser: any = jwtDecode(userToken ?? "");
    console.log('huhuhuhu_', infoUser);
    this.email = infoUser.email;
    this.nom = infoUser.nom;
    this.prenom = infoUser.prenom;
    this.id = infoUser.id;
  }
}
