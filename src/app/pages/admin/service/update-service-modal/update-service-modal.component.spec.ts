import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceModalComponent } from './update-service-modal.component';

describe('UpdateServiceModalComponent', () => {
  let component: UpdateServiceModalComponent;
  let fixture: ComponentFixture<UpdateServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateServiceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
