import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ServicesService } from '../../../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'banner-login',
  standalone: true,
  imports: [NzModalModule, NzButtonModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  credentials = {
    email: '',
    mot_de_passe: ''
  };



  constructor(private servicesService: ServicesService, private router: Router) { }

  onSubmit(): void {
    this.servicesService.login(this.credentials).subscribe(
      response => {
        // Handle successful login, e.g., save token to localStorage
        localStorage.setItem('token', response.data.token);
        console.log('Login successful', localStorage.getItem('token'));

        // Assuming decodedToken is of type JwtPayload or any
        const token = response.data.token;
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(response.data.token);

        console.log('Decoded Token:', decodedToken);

        // Check if 'type_utilisateur' exists in the decoded token
        if (decodedToken && decodedToken.type_utilisateur) {
          if (decodedToken.type_utilisateur === 'manager') {
            this.router.navigate(['/manager']);
          } else {
            this.router.navigate(['/client']);
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
