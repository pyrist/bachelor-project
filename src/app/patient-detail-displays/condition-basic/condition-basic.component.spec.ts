import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionBasicComponent } from './condition-basic.component';

describe('ConditionBasicComponent', () => {
  let component: ConditionBasicComponent;
  let fixture: ComponentFixture<ConditionBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
