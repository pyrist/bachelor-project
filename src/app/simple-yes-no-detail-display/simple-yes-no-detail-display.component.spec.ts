import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleYesNoDetailDisplayComponent } from './simple-yes-no-detail-display.component';

describe('SimpleYesNoDetailDisplayComponent', () => {
  let component: SimpleYesNoDetailDisplayComponent;
  let fixture: ComponentFixture<SimpleYesNoDetailDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleYesNoDetailDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleYesNoDetailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
