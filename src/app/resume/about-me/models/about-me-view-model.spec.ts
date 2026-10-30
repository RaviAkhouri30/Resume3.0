import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend, PROFILE_FIXTURE } from 'src/app/shared-module/testing/stub-http-backend';
import { AboutMeViewModel } from './about-me-view-model';

describe('AboutMeViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AboutMeViewModel, provideStubHttpBackend({ 'about-me': PROFILE_FIXTURE })]
    });
  });

  it('has no highlights before the profile loads', () => {
    expect(TestBed.inject(AboutMeViewModel).highlights()).toEqual([]);
  });

  it('prepends computed years of experience to the stored highlights', () => {
    const viewModel = TestBed.inject(AboutMeViewModel);
    viewModel.init().subscribe();

    const [years, ...rest] = viewModel.highlights();
    expect(years?.label).toBe('Years of Experience');
    expect(years?.value).toBe(viewModel.data()!.yearsOfExperience()!);
    expect(rest).toEqual(PROFILE_FIXTURE.highlights);
  });
});
