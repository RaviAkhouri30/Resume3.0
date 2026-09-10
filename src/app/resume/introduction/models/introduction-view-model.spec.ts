import { IntroductionViewModel } from './introduction-view-model';
import { TestBed } from '@angular/core/testing';

describe('IntroductionViewModel', () => {
  it('should create an instance', () => {
    expect(TestBed.inject(IntroductionViewModel)).toBeTruthy();
  });
});
