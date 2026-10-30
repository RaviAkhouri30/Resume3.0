import { Signal } from "@angular/core";

export interface ILoader {
  readonly isLoading: Signal<boolean>;
  show(): void;
  hide(): void;
}
