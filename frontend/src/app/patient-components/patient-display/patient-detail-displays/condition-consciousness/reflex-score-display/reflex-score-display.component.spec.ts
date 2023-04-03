import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflexScoreDisplayComponent } from './reflex-score-display.component';

describe('ReflexScoreDisplayComponent', () => {
  let component: ReflexScoreDisplayComponent;
  let fixture: ComponentFixture<ReflexScoreDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReflexScoreDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflexScoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
