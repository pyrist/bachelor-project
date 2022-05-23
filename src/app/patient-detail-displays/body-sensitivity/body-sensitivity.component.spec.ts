import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySensitivityComponent } from './body-sensitivity.component';

describe('BodySensitivityComponent', () => {
  let component: BodySensitivityComponent;
  let fixture: ComponentFixture<BodySensitivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodySensitivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySensitivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
