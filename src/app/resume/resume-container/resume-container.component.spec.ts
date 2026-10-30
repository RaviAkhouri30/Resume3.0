import { TestBed } from '@angular/core/testing';
import { provideStubHttpBackend, PROFILE_FIXTURE } from 'src/app/shared-module/testing/stub-http-backend';
import { ResumeContainerComponent } from './resume-container.component';

describe('ResumeContainerComponent', () => {
  it('renders a single h1 and a heading for every section', async () => {
    TestBed.configureTestingModule({
      imports: [ResumeContainerComponent],
      providers: [provideStubHttpBackend({
        'about-me': PROFILE_FIXTURE, experience: [], 'projects-experience': [], education: [],
        skills: [], hobbies: [], 'contact-details': []
      })]
    });
    const fixture = TestBed.createComponent(ResumeContainerComponent);
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelectorAll('h1').length).toBe(1);
    const headings = Array.from(element.querySelectorAll('h2')).map(h => h.textContent?.trim());
    expect(headings).toEqual(jasmine.arrayContaining(['About Me', 'Work Experience', 'Projects', 'Education & Certifications']));
    expect(element.querySelector('main#main')).not.toBeNull();
    expect(element.querySelector('footer')?.textContent).toContain(`${new Date().getFullYear()} Ravi Akhouri`);
  });
});
