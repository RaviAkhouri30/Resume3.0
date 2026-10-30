import { Clipboard } from '@angular/cdk/clipboard';
import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend } from 'src/app/shared-module/testing/stub-http-backend';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  it('renders contact links and swaps the icon after copying', async () => {
    TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideStubHttpBackend({
        'contact-details': [{ icon: 'bi bi-phone-fill', details: '+91 88048 04868', type: 'mobile' }]
      })]
    });
    const clipboard = TestBed.inject(Clipboard);
    spyOn(clipboard, 'copy').and.returnValue(true);
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('a')?.getAttribute('href')).toBe('tel:+918804804868');

    element.querySelector('button')!.click();
    await fixture.whenStable();

    expect(clipboard.copy).toHaveBeenCalledWith('+91 88048 04868');
    expect(element.querySelector('button i')?.className).toContain('bi-check2');
  });
});
