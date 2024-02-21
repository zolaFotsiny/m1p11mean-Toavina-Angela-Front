import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRendezVousComponent } from './calendar-rendez-vous.component';

describe('CalendarRendezVousComponent', () => {
  let component: CalendarRendezVousComponent;
  let fixture: ComponentFixture<CalendarRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarRendezVousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalendarRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
