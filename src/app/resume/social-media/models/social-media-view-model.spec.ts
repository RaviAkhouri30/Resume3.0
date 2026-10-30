import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend, PROFILE_FIXTURE } from 'src/app/shared-module/testing/stub-http-backend';
import { SocialMediaViewModel } from './social-media-view-model';

describe('SocialMediaViewModel', () => {
  it('only exposes configured https links', () => {
    TestBed.configureTestingModule({
      providers: [SocialMediaViewModel, provideStubHttpBackend({ 'about-me': PROFILE_FIXTURE })]
    });
    const viewModel = TestBed.inject(SocialMediaViewModel);
    viewModel.init().subscribe();

    expect(viewModel.links().map(link => link.label)).toEqual(['GitHub']);
  });
});
