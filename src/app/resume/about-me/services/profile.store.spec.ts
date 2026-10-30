import { TestBed } from '@angular/core/testing';
import { IHttpBackend } from 'src/app/shared-module/interfaces/i-http-backend';
import { provideStubHttpBackend, PROFILE_FIXTURE, StubHttpBackend } from 'src/app/shared-module/testing/stub-http-backend';
import { ProfileStore } from './profile.store';

describe('ProfileStore', () => {
  it('fetches the profile once and shares it between subscribers', () => {
    TestBed.configureTestingModule({ providers: [provideStubHttpBackend({ 'about-me': PROFILE_FIXTURE })] });
    const store = TestBed.inject(ProfileStore);
    const backend = TestBed.inject(IHttpBackend) as StubHttpBackend;
    const names: string[] = [];

    store.profile$.subscribe(profile => names.push(profile.firstName));
    store.profile$.subscribe(profile => names.push(profile.firstName));

    expect(names).toEqual(['Ravi', 'Ravi']);
    expect(backend.requestedUrls.length).toBe(1);
  });
});
