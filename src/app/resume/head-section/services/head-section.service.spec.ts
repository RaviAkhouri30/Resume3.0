import { TestBed } from '@angular/core/testing';

import { HeadSectionService } from './head-section.service';

describe('HeadSectionService', () => {
  let service: HeadSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
