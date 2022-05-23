import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionMentalComponent } from './condition-mental.component';

describe('ConditionMentalComponent', () => {
  let component: ConditionMentalComponent;
  let fixture: ComponentFixture<ConditionMentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionMentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionMentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
