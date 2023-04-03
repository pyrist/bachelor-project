import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResultDisplayComponent } from './table-result-display.component';

describe('TableResultDisplayComponent', () => {
  let component: TableResultDisplayComponent;
  let fixture: ComponentFixture<TableResultDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableResultDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
