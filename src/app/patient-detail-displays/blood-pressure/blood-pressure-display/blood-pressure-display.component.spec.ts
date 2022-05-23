import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureDisplayComponent } from './blood-pressure-display.component';

describe('BloodPressureDisplayComponent', () => {
  let component: BloodPressureDisplayComponent;
  let fixture: ComponentFixture<BloodPressureDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodPressureDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
