import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessAssessmentComponent } from './illness-assessment.component';

describe('IllnessAssessmentComponent', () => {
  let component: IllnessAssessmentComponent;
  let fixture: ComponentFixture<IllnessAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllnessAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
