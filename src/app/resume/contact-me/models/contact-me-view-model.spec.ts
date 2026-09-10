import { ContactMeViewModel } from './contact-me-view-model';
import { TestBed } from '@angular/core/testing';

describe('ContactMeViewModel', () => {
  it('should create an instance', () => {
    expect(TestBed.inject(ContactMeViewModel)).toBeTruthy();
  });
});
