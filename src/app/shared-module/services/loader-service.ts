import { computed, Injectable, Signal, signal } from '@angular/core';
import { ILoader } from '../interfaces/i-loader';

/**
 * Stores the application-wide loading state.
 *
 * Tracks the number of in-flight requests rather than a single flag, so one
 * request finishing cannot hide the loader while another is still pending.
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService implements ILoader {
  private readonly pendingRequests = signal(0);

  /** True while at least one request is in flight. */
  public readonly isLoading: Signal<boolean> = computed(() => this.pendingRequests() > 0);

  /** Registers the start of a request. */
  public show(): void {
    this.pendingRequests.update(count => count + 1);
  }

  /** Registers the end of a request. */
  public hide(): void {
    this.pendingRequests.update(count => Math.max(0, count - 1));
  }
}
