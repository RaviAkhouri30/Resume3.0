import { AboutMeViewModel } from './about-me-view-model';
import { TestBed } from '@angular/core/testing';

describe('AboutMeViewModel', () => {
  it('should create an instance', () => {
    expect(TestBed.inject(AboutMeViewModel)).toBeTruthy();
  });
});
