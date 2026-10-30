import { EducationDataModel } from '../models/education-data-model';
import { ExperienceDataModel } from '../models/experience-data-model';
import { mapEducationToTimelineItem, mapExperienceToTimelineItem } from './transform-to-timeline';

describe('timeline mappers', () => {
  it('combines designation and tenure for experience entries', () => {
    const item = mapExperienceToTimelineItem(new ExperienceDataModel({
      companyName: 'Quorum Software', designation: 'Senior Software Engineer', tenure: 'January 2026 - Present',
      responsibilities: ['Built things']
    }));

    expect(item).toEqual({
      title: 'Quorum Software',
      subtitle: 'Senior Software Engineer · January 2026 - Present',
      bullets: ['Built things']
    });
  });

  it('omits empty education fields instead of rendering placeholders', () => {
    const item = mapEducationToTimelineItem(new EducationDataModel({
      degree: 'Azure Fundamentals', instituteName: 'Wipro', graduationYear: '2020'
    }));

    expect(item.title).toBe('Azure Fundamentals (2020)');
    expect(item.subtitle).toBe('Wipro');
    expect(item.description).toBeUndefined();
  });

  it('formats a full education entry', () => {
    const item = mapEducationToTimelineItem(new EducationDataModel({
      degree: 'B.Tech.', major: 'ECE', instituteName: 'SVIST', university: 'WBUT', graduationYear: '2019', grade: '7.79'
    }));

    expect(item).toEqual({ title: 'B.Tech. in ECE (2019)', subtitle: 'SVIST, WBUT', description: 'Grade: 7.79' });
  });
});
