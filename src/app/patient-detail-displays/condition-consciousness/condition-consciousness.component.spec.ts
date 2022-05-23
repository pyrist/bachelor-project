import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionConsciousnessComponent } from './condition-consciousness.component';

describe('ConditionConsciousnessComponent', () => {
  let component: ConditionConsciousnessComponent;
  let fixture: ComponentFixture<ConditionConsciousnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionConsciousnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionConsciousnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
