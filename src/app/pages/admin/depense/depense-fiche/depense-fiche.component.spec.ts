import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseFicheComponent } from './depense-fiche.component';

describe('DepenseFicheComponent', () => {
  let component: DepenseFicheComponent;
  let fixture: ComponentFixture<DepenseFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepenseFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepenseFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
