import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // Import Chart.js directly for type safety

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  data: number[] = [40, 55, 60, 45, 70, 50];

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;

    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [{
            label: 'Monthly Sales',
            data: this.data,
            backgroundColor: 'rgba(0, 128, 0, 0.2)',
            borderColor: 'rgba(0, 128, 0, 1)',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHitRadius: 30,
            pointBackgroundColor: 'rgba(0, 128, 0, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              reverse: false // Use directly within the 'y' object
            }
          }
        }
      });

    } else {
      console.error('Canvas element with ID "myChart" not found.');
    }
  }
}
