import { TestBed } from '@angular/core/testing';

import { TextCleanerService } from './text-cleaner.service';

describe('TextCleanerService', () => {
  let service: TextCleanerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextCleanerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
