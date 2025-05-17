import { TestBed } from '@angular/core/testing';

import { FakeHttpsService } from './fake-https.service';

describe('FakeHttpsService', () => {
  let service: FakeHttpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeHttpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
