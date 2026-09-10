import { HobbiesViewModel } from './hobbies-view-model';
import { TestBed } from '@angular/core/testing';

describe('HobbiesViewModel', () => {
  it('should create an instance', () => {
    expect(TestBed.inject(HobbiesViewModel)).toBeTruthy();
  });
});
