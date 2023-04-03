import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDetailDisplayComponent } from './pupil-detail-display.component';

describe('PupilDetailDisplayComponent', () => {
  let component: PupilDetailDisplayComponent;
  let fixture: ComponentFixture<PupilDetailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PupilDetailDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
