import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelUpdateComponent } from './personnel-update.component';

describe('PersonnelUpdateComponent', () => {
  let component: PersonnelUpdateComponent;
  let fixture: ComponentFixture<PersonnelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonnelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
