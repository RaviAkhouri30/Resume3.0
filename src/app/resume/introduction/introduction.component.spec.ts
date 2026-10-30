import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend, PROFILE_FIXTURE } from 'src/app/shared-module/testing/stub-http-backend';
import { IntroductionComponent } from './introduction.component';

describe('IntroductionComponent', () => {
  it('renders the name in the page heading and a direct resume download link', async () => {
    TestBed.configureTestingModule({
      imports: [IntroductionComponent],
      providers: [provideStubHttpBackend({ 'about-me': PROFILE_FIXTURE })]
    });
    const fixture = TestBed.createComponent(IntroductionComponent);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h1')?.textContent).toContain("I'm Ravi");
    expect(element.querySelector('h1')?.textContent).toContain('Senior Angular Developer');
    const link = element.querySelector('a');
    expect(link?.getAttribute('href')).toBe('assets/Ravi_Akhouri_Resume.pdf');
    expect(link?.getAttribute('download')).toBe('Ravi_Akhouri_Resume.pdf');
  });
});
