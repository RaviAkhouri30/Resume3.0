import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { IDownloadLink, resumeDownload } from 'src/app/shared-module/helper-functions/media';
import { environment } from 'src/environments/environment';

/** Sticky header with the section navigation, a mobile menu and the résumé download. */
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteHeaderComponent {
  protected readonly resume: IDownloadLink = resumeDownload(environment.media);

  /** In-page sections; each `id` must exist in the page. */
  protected readonly navLinks = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'personal-projects', label: 'Personal Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  /** Mobile navigation drawer. */
  protected readonly menuOpen = signal(false);

  /** Section currently in the middle of the viewport, highlighted in the navigation. */
  protected readonly activeSection = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // A thin band across the middle of the viewport decides which section is "current".
      const observer = new IntersectionObserver(entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          this.activeSection.set(visible.target.id);
        }
      }, { rootMargin: '-45% 0px -50% 0px' });

      this.navLinks
        .map(link => document.getElementById(link.id))
        .forEach(section => section && observer.observe(section));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
