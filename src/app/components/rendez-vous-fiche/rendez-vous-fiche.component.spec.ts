import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousFicheComponent } from './rendez-vous-fiche.component';

describe('RendezVousFicheComponent', () => {
  let component: RendezVousFicheComponent;
  let fixture: ComponentFixture<RendezVousFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezVousFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendezVousFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
