import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ServicesService } from '../../../app.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    NzSpinModule,
  ],
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  financeData: any = null;
  constructor(private servicesService: ServicesService) { }


  labels: string[] = [];
  data: number[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;


    this.servicesService.getFinance().subscribe(
      (response: any) => {
        this.financeData = response.data; // Mettez à jour les données de finance
        // ...
      },
      (error) => {
        console.error('Error fetching finance data:', error);
      }
    );
    this.servicesService.getRdvCountPerDay().subscribe(
      (response: any) => {
        this.loading = false;
        console.log('Raw response:', response);
        if (response && response.labels && response.data) {
          this.labels = response.labels;
          this.data = response.data;
        } else {
          console.error('Invalid response structure:', response);
        }
        this.createChart();
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching services:', error);
      }
    );
  }

  createChart() {
    const bar = document.getElementById('myChart') as HTMLCanvasElement | null;
    const moyenneTravail = document.getElementById('myChart2') as HTMLCanvasElement | null;

    if (bar) {
      new Chart(bar, {
        type: 'bar',  // Change the type to 'bar'
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Reservation(s)',
            data: this.data,

            borderWidth: 1
          }]
        },
        options: {

          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Le nombre de réservation par jour'
            }
          },
        }
      });
    } else {
      console.error('Canvas element with ID "myChart" not found.');
    }


    if (moyenneTravail) {
      new Chart(moyenneTravail, {
        type: 'doughnut',  // Change the type to 'doughnut'
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Monthly Sales',
            data: this.data,
            backgroundColor: ['#6bc513', 'lightgray', 'lightblue', 'yellow'],
            borderColor: ['#6bc513', 'lightgray', 'lightblue', 'yellow'],
            borderWidth: 1
          }]
        },
        options: {
          cutout: '70%',  // Adjust the cutout percentage to control the size of the hole in the doughnut chart
        }

      });
    } else {
      console.error('Canvas element with ID "myChart" not found.');
    }
  }
}
