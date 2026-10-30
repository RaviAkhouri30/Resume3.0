import { TestBed } from '@angular/core/testing';
import { IHttpBackend } from '../interfaces/i-http-backend';
import { FakeHttpsService } from '../services/fake-https.service';
import { provideHttpBackend } from './provide-http-backend';

describe('provideHttpBackend', () => {
  it('binds IHttpBackend to the fake adapter', () => {
    TestBed.configureTestingModule({ providers: [provideHttpBackend('fake')] });

    expect(TestBed.inject(IHttpBackend)).toBeInstanceOf(FakeHttpsService);
  });
});
