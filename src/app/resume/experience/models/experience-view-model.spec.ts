import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend } from 'src/app/shared-module/testing/stub-http-backend';
import { ExperienceViewModel } from './experience-view-model';

describe('ExperienceViewModel', () => {
  it('maps experience records to timeline items', () => {
    TestBed.configureTestingModule({
      providers: [ExperienceViewModel, provideStubHttpBackend({
        experience: [{ companyName: 'Siemens', designation: 'Angular UI Developer', tenure: '2023', responsibilities: ['A'] }]
      })]
    });
    const viewModel = TestBed.inject(ExperienceViewModel);
    expect(viewModel.timeline()).toEqual([]);

    viewModel.init().subscribe();

    expect(viewModel.timeline()).toEqual([
      { title: 'Siemens', subtitle: 'Angular UI Developer', meta: '2023', bullets: ['A'] }
    ]);
  });
});
