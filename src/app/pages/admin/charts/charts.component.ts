import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  labels: string[] = ['jean', 'Paul', 'Luc'];
  data: number[] = [40, 55, 60];

  ngOnInit(): void {
    this.createChart();
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
            label: 'Monthly Sales',
            data: this.data,
            backgroundColor: ['rgba(0, 128, 0)', 'rgba(255, 0, 0)', 'rgba(0, 0, 255)', 'rgba(255, 255, 0)', 'rgba(128, 0, 128)', 'rgba(0, 255, 255)'],
            borderColor: ['rgba(0, 128, 0, 1)', 'rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 255, 0, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 255, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
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
            backgroundColor: ['rgba(0, 128, 0)', 'rgba(255, 0, 0)', 'rgba(0, 0, 255)', 'rgba(255, 255, 0)', 'rgba(128, 0, 128)', 'rgba(0, 255, 255)'],
            borderColor: ['rgba(0, 128, 0, 1)', 'rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 1)', 'rgba(255, 255, 0, 1)', 'rgba(128, 0, 128, 1)', 'rgba(0, 255, 255, 1)'],
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
