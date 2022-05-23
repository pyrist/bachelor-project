import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensibilityScoreDetailDisplayComponent } from './sensibility-score-detail-display.component';

describe('SensibilityScoreDetailDisplayComponent', () => {
  let component: SensibilityScoreDetailDisplayComponent;
  let fixture: ComponentFixture<SensibilityScoreDetailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensibilityScoreDetailDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensibilityScoreDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
