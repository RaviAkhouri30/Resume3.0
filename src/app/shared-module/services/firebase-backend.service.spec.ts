import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { FirebaseBackendService } from './firebase-backend.service';
import { FirebaseDatabaseService } from './firebase-database.service';

describe('FirebaseBackendService', () => {
  let service: FirebaseBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirebaseBackendService,
        { provide: FirebaseDatabaseService, useValue: { fireStore: {} } }
      ]
    });
    service = TestBed.inject(FirebaseBackendService);
  });

  it('reports an invalid resume URL as an error response instead of throwing', async () => {
    const response = await firstValueFrom(service.get('users/RS-1/about-me'));

    expect(response.status).toBe(500);
    expect(response.statusText).toContain('Invalid resume URL');
  });
});
