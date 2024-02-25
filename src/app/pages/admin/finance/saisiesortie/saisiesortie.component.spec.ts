import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisiesortieComponent } from './saisiesortie.component';

describe('SaisiesortieComponent', () => {
  let component: SaisiesortieComponent;
  let fixture: ComponentFixture<SaisiesortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaisiesortieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaisiesortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
