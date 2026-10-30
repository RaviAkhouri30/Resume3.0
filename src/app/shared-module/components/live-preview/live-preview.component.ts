import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Desktop width the framed page is laid out at before being scaled down to fit. */
const FRAME_WIDTH = 1280;

/**
 * A browser-style window that runs a live site in an iframe and slowly pans down and back up,
 * like a screen recording. Pauses on hover and from its play/pause button; stays still for
 * users who prefer reduced motion.
 */
@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrl: './live-preview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LivePreviewComponent {

  public readonly url = input.required<string>();
  public readonly title = input.required<string>();
  public readonly displayUrl = input.required<string>();
  /** Height of the page area to pan through, in CSS pixels at the 1280px layout. */
  public readonly frameHeight = input(3000);

  protected readonly frameWidth = FRAME_WIDTH;
  protected readonly paused = signal(false);
  protected readonly loaded = signal(false);
  protected readonly scale = signal(0.5);

  private readonly sanitizer = inject(DomSanitizer);
  /** The URLs come from the static project list, never from user input. */
  protected readonly safeUrl = computed<SafeResourceUrl>(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.url()));

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  constructor() {
    // Scale the 1280px-wide page to whatever width the window has.
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        this.scale.set(entry.contentRect.width / FRAME_WIDTH);
      }
    });
    afterNextRender(() => observer.observe(this.viewport().nativeElement));
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }

  protected toggle(): void {
    this.paused.update(paused => !paused);
  }
}
