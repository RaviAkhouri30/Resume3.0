import { TestBed } from '@angular/core/testing';

import { ProjectsExperienceService } from './projects-experience.service';

describe('ProjectsExperienceService', () => {
  let service: ProjectsExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
