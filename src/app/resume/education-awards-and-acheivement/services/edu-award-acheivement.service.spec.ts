import { TestBed } from '@angular/core/testing';

import { EduAwardAcheivementService } from './edu-award-acheivement.service';

describe('EduAwardAcheivementService', () => {
  let service: EduAwardAcheivementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduAwardAcheivementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
