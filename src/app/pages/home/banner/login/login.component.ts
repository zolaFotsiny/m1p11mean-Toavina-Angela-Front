import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ServicesService } from '../../../../app.service';

@Component({
  selector: 'banner-login',
  standalone: true,
  imports: [NzModalModule, NzButtonModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;
  isVisible = false;
  credentials: { email: string, mot_de_passe: string } = { email: '', mot_de_passe: 'cmcm' };
  isSignUpMode = false; // Track the mode (login or signup)
  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }
  inscription: {
    email: string,
    nom: string,
    prenom: string,
    contact: number,
    mot_de_passe: string,
    confirm_mot_de_passe: string,
    type_utilisateur: string,
  } = {
      email: '',
      nom: '',
      prenom: '',
      contact: 0,
      mot_de_passe: '',
      confirm_mot_de_passe: '',
      type_utilisateur: 'client',
    };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok test clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }



  constructor(private servicesService: ServicesService, private router: Router) { }

  isValidForm(): boolean {
    return !!this.credentials.email && !!this.credentials.mot_de_passe;
  }
  isValidFormS(): boolean {
    return !!this.inscription.email &&
      !!this.inscription.nom &&
      !!this.inscription.prenom &&
      !!this.inscription.mot_de_passe &&
      !!this.inscription.confirm_mot_de_passe;
    // !!this.inscription.contact
  }


  onSubmit(): void {
    // console.log('test', this.credentials);
    if (this.isValidForm()) {
      // Votre logique de soumission ici
      this.loading = true;
      this.servicesService.login(this.credentials).subscribe(
        response => {
          this.loading = false;
          // Handle successful login, e.g., save token to localStorage
          localStorage.setItem('token', response.data.token);
          // console.log('Login successful', localStorage.getItem('token'));

          // Assuming decodedToken is of type JwtPayload or any
          const token = response.data.token;
          const tokenBearer = 'Bearer ' + token;
          localStorage.setItem('token', tokenBearer);
          const decodedToken: any = jwtDecode(response.data.token);

          console.log('Decoded Token:', decodedToken);

          // Check if 'type_utilisateur' exists in the decoded token
          if (decodedToken && decodedToken.type_utilisateur) {
            console.log('test', decodedToken.type_utilisateur);

            if (decodedToken.type_utilisateur === 'manager' || decodedToken.type_utilisateur === 'employee') {
              this.router.navigate(['/manager/chart']);
            } else {
              this.router.navigate(['/client/rendezvous/list']);
            }
          } else {
            // Handle the case where 'type_utilisateur' is not present in the token
            console.error('Property type_utilisateur is missing in the decoded token.');
          }
        },
        error => {
          // Handle login error
          console.error('Login failed', error);
        }
      );
    }

  }

  signup(): void {
    if (this.isValidFormS()) {
      this.loading = true;
      // Call the registerUser method from ServicesService
      this.servicesService.registerUser(this.inscription).subscribe(
        response => {
          // Handle successful registration
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/client/rendezvous/list']);
          this.loading = false;
        },
        error => {
          // Handle registration error
          console.error('Error registering user:', error);
          this.loading = false;
        }
      );
    }
  }
}
