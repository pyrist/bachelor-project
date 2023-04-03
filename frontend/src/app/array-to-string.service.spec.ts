import { TestBed } from '@angular/core/testing';

import { ArrayToStringService } from './array-to-string.service';

describe('ArrayToStringService', () => {
  let service: ArrayToStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayToStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
