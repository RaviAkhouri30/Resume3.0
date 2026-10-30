import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, input, viewChild } from '@angular/core';
import { ITimeline } from '../../interfaces/i-timeline';

/** Responsive grid of cards for timeline-shaped items (projects, awards, education, hobbies). */
@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGridComponent {

  public readonly items = input.required<ITimeline[]>();

  /** Shows a 01, 02, … index on each card. */
  public readonly numbered = input(false);

  /** Icon class used when an item has no icon of its own. */
  public readonly icon = input<string>();

  /** Number of columns on wide screens. */
  public readonly columns = input<2 | 3>(2);

  /** Bullets shown before the rest collapse behind a "Show more" toggle; all when unset. */
  public readonly visibleBullets = input<number>();

  private readonly grid = viewChild.required<ElementRef<HTMLElement>>('grid');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // Feeds the pointer position to the hovered card's spotlight. Bound natively and delegated
      // from the grid, so moving the pointer never runs change detection.
      const grid = this.grid().nativeElement;
      const onMove = (event: PointerEvent) => {
        const card = (event.target as Element).closest<HTMLElement>('.grid-card');
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
          card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
        }
      };
      grid.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => grid.removeEventListener('pointermove', onMove));
    });
  }

}
