import { PersonDataModel } from './person-data-model';

describe('PersonDataModel', () => {
  it('normalises missing fields to safe defaults', () => {
    const person = new PersonDataModel({});

    expect(person.firstName).toBe('');
    expect(person.highlights).toEqual([]);
    expect(person.awardsAndAchievements).toEqual([]);
  });

  it('derives whole years of experience from the career start date', () => {
    const person = new PersonDataModel({ careerStartDate: '2019-10-01' });

    expect(person.yearsOfExperience(new Date(2026, 8, 30))).toBe(6);
    expect(person.yearsOfExperience(new Date(2026, 9, 29))).toBe(7);
  });

  it('returns null when the career start date is missing or invalid', () => {
    expect(new PersonDataModel({}).yearsOfExperience()).toBeNull();
    expect(new PersonDataModel({ careerStartDate: 'soon' }).yearsOfExperience()).toBeNull();
  });
});
