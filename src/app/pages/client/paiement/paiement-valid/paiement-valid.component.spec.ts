import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementValidComponent } from './paiement-valid.component';

describe('PaiementValidComponent', () => {
  let component: PaiementValidComponent;
  let fixture: ComponentFixture<PaiementValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementValidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
