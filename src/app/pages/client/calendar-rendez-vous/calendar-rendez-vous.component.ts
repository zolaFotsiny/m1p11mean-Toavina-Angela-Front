import { Component, OnInit } from '@angular/core';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../app.service';



export interface rendezVous {
  date: Date,
  labele: string
}

@Component({
  selector: 'app-calendar-rendez-vous',
  standalone: true,
  imports: [NzCalendarModule, NzBadgeModule, CommonModule],
  templateUrl: './calendar-rendez-vous.component.html',
  styleUrl: './calendar-rendez-vous.component.scss'
})
export class CalendarRendezVousComponent implements OnInit {

  rendezVous: rendezVous[] = [
    { date: new Date('2024-02-21T08:00:00'), labele: 'Rendez-vous 1' },
    { date: new Date('2024-02-21T10:30:00'), labele: 'Rendez-vous 2' },
    // Ajoutez d'autres rendez-vous au besoin
  ];
  constructor(private servicesService: ServicesService) { }
  ngOnInit(): void {
    this.servicesService.getRendezVous().subscribe(
      (response: any) => {
        console.log('gerge', response);

        this.rendezVous = response.data.map((item: any) => {
          return {
            date: new Date(item.date_heure), // Change to match the actual date property
            labele: item.taches[0].id_service.designation
          };
        });
        // console.log('test',this.rendezVous);

      },
      (error) => {
        console.error('Error fetching services:', error);
        // this.isLoading = false;
      }
    );
    console.log('test', this.rendezVous);

  }


  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}