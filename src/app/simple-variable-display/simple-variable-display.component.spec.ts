import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleVariableDisplayComponent } from './simple-variable-display.component';

describe('SimpleVariableDisplayComponent', () => {
  let component: SimpleVariableDisplayComponent;
  let fixture: ComponentFixture<SimpleVariableDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleVariableDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleVariableDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
