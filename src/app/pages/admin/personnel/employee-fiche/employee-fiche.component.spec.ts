import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFicheComponent } from './employee-fiche.component';

describe('EmployeeFicheComponent', () => {
  let component: EmployeeFicheComponent;
  let fixture: ComponentFixture<EmployeeFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
