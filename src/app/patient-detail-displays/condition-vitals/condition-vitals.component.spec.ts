import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionVitalsComponent } from './condition-vitals.component';

describe('ConditionVitalsComponent', () => {
  let component: ConditionVitalsComponent;
  let fixture: ComponentFixture<ConditionVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
