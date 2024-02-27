import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFicheComponent } from './client-fiche.component';

describe('ClientFicheComponent', () => {
  let component: ClientFicheComponent;
  let fixture: ComponentFixture<ClientFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
