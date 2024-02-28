import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepenseAddComponent } from './depense-add.component';

describe('DepenseAddComponent', () => {
  let component: DepenseAddComponent;
  let fixture: ComponentFixture<DepenseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepenseAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepenseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
