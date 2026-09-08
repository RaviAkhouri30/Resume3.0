import { TestBed } from '@angular/core/testing';
import { FirebaseBackendService } from './firebase-backend.service';

describe('FirebaseBackendService', () => {
  let service: FirebaseBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
