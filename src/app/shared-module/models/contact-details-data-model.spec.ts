import { ContactType } from '../enums/contact-type';
import { ContactDetailsDataModel } from './contact-details-data-model';

describe('ContactDetailsDataModel', () => {
  it('builds a dialable tel: link', () => {
    const contact = new ContactDetailsDataModel({ icon: '', details: '+91 88048-04868', type: ContactType.mobile });

    expect(contact.href).toBe('tel:+918804804868');
  });

  it('builds a mailto: link', () => {
    const contact = new ContactDetailsDataModel({ icon: '', details: 'a@b.in', type: ContactType.email });

    expect(contact.href).toBe('mailto:a@b.in');
  });
});
