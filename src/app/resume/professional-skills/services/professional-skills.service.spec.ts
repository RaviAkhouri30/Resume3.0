import { TestBed } from '@angular/core/testing';

import { ProfessionalSkillsService } from './professional-skills.service';

describe('ProfessionalSkillsService', () => {
  let service: ProfessionalSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
