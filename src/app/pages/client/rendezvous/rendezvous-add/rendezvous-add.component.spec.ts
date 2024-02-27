import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousAddComponent } from './rendezvous-add.component';

describe('RendezvousComponent', () => {
  let component: RendezvousAddComponent;
  let fixture: ComponentFixture<RendezvousAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RendezvousAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
