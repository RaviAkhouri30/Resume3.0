import { DestroyRef, Directive, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IViewModel } from '../../interfaces/i-view-model';

/**
 * Base class for views bound to a view model.
 *
 * The concrete component only declares which view model it uses; this class
 * starts the view model when the view initialises and stops it automatically
 * when the view is destroyed.
 *
 * @template TViewModel - The view model exposed to the component template as `model`.
 */
@Directive()
export abstract class BaseComponent<TViewModel extends IViewModel<unknown>> implements OnInit {

  /** View model bound to the template. */
  protected abstract readonly model: TViewModel;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.model.init().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
