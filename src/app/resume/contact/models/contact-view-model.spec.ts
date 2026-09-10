import { ContactViewModel } from './contact-view-model';
import { TestBed } from '@angular/core/testing';

describe('ContactViewModel', () => {
  it('should create an instance', () => {
    expect(TestBed.inject(ContactViewModel)).toBeTruthy();
  });
});
