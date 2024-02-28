import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ServicesService } from '../../../app.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { forkJoin } from 'rxjs';
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
  revenueLabels: string[] = [];
  revenueData: number[] = [];


  labels: string[] = [];
  data: number[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;


    const finance$ = this.servicesService.getFinance();
    const rdvCountPerDay$ = this.servicesService.getRdvCountPerDay();
    const revenueParMois$ = this.servicesService.getRevenueParMois();

    forkJoin([finance$, rdvCountPerDay$, revenueParMois$]).subscribe(
      (responses: any[]) => {
        this.financeData = responses[0].data;
        this.labels = responses[1].labels;
        this.data = responses[1].data;
        this.revenueLabels = responses[2].labels;
        this.revenueData = responses[2].data;

        this.loading = false;
        this.createChart();
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching data:', error);
      }
    );




  }

  createChart() {
    const line = document.getElementById('lineChart') as HTMLCanvasElement | null;
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

    if (line) {
      new Chart(line, {
        type: 'line',  // Change the type to 'line'
        data: {
          labels: this.revenueLabels,
          datasets: [{
            label: 'Revenue en Ariary',
            data: this.revenueData,
            fill: false,
            borderColor: 'grey',
            tension: 0.1
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
              text: 'Chiffre d’affaires par jour de ce mois ci'
            }
          },
        }
      });
    } else {
      console.error('Canvas element with ID "line" not found.');
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
