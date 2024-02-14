import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../app.service';
import { HomeComponent } from '../home.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-body',
  standalone: true,
  imports: [CommonModule, NzFlexModule, HomeComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  title = 'm1p11mean-Toavina-Angela-Front';

  services: any[] = [];
  isLoading = true; // Add a loading flag
  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.servicesService.getServices().subscribe(
      (response: any) => {
        console.log('Raw response:', response);

        // Access the 'data' property if it exists
        if (response && response.data) {
          this.services = response.data;
          console.log('Services:', this.services);
        } else {
          console.error('Invalid response structure:', response);
        }

        // Set loading flag to false once data is obtained
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching services:', error);
      }
    );
  }
}
