import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionHistoryComponent } from './condition-history.component';

describe('ConditionHistoryComponent', () => {
  let component: ConditionHistoryComponent;
  let fixture: ComponentFixture<ConditionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
