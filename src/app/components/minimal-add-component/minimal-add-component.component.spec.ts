import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalAddComponentComponent } from './minimal-add-component.component';

describe('MinimalAddComponentComponent', () => {
  let component: MinimalAddComponentComponent;
  let fixture: ComponentFixture<MinimalAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalAddComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinimalAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
