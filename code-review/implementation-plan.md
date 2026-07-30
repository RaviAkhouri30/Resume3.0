# Implementation Plan: Resume3.0 Improvements

## Objective

Create a concrete refactor plan to improve architecture, SOLID compliance, Angular idioms, and maintainability. This plan is intentionally prescriptive and includes code-level examples for the most impactful changes.

## Priority Order

1. Fix Angular DI and provider patterns
2. Simplify and decouple view-model creation
3. Harden base class lifecycle and naming
4. Improve shared module exports and feature module providers
5. Align interfaces and tokens with Angular best practice

---

## 1. Fix Angular DI and provider patterns

### Problem
- `ServiceProviderFactory` manually creates `HttpClient`.
- `ResumeModule` re-provides `provideHttpClient(withInterceptorsFromDi())`.
- `IFakeHttps` is an abstract class with `@Inject` metadata.

### Goal
Use Angular dependency injection consistently and avoid manually constructing framework classes.

### Recommended changes
- Remove `provideHttpClient(...)` from `ResumeModule`.
- Keep `provideHttpClient(withInterceptorsFromDi())` in `AppModule` only.
- Replace `IFakeHttps` provider metadata with a proper `InjectionToken`.
- Provide the fake backend implementation via `useClass` or `useFactory` on the token.

### Code examples
#### `src/app/shared-module/interfaces/i-fake-https.ts`
```ts
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

export interface IFakeHttps {
  get<T>(url: string): Observable<HttpResponse<T>>;
}

export const FAKE_HTTPS = new InjectionToken<IFakeHttps>('FAKE_HTTPS');
```

#### `src/app/app.module.ts`
```ts
import { HttpHandler, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FAKE_HTTPS } from './shared-module/interfaces/i-fake-https';
import { FakeHttpsService } from './shared-module/services/fake-https.service';

@NgModule({
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: FAKE_HTTPS,
      useClass: FakeHttpsService
    }
  ]
})
export class AppModule {}
```

#### `src/app/shared-module/factories/service-provider-factory.ts`
- Remove or simplify this factory.
- Prefer standard DI and conditional provider registration at module level.

---

## 2. Simplify and decouple view-model creation

### Problem
- `ViewModelFactory` uses a switch and integer enum values.
- `BaseComponent` depends on a manual factory instead of Angular DI.

### Goal
Use DI to instantiate view models and remove the brittle factory switch.

### Recommended changes
- Make each view-model class `@Injectable({ providedIn: 'root' })` or provide them in `ResumeModule`.
- Inject the appropriate view-model directly into each component.
- Remove `ViewModelContext` switch registration unless absolutely needed.

### Code examples
#### `src/app/resume/about-me/models/about-me-view-model.ts`
```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AboutMeViewModel extends ViewModel<IPersonDataModel> {
  constructor(
    private readonly aboutMeService: AboutMeService,
    private readonly commonService: CommonService
  ) {
    super();
  }

  protected override attachViewHandler = (): Observable<void> => {
    return this.aboutMeService.attachViewApiHandler<IPersonDataModel>().pipe(
      tap(result => this.data = new PersonDataModel(result)),
      tap(result => this.commonService.aboutMeData = result),
      map(() => {})
    );
  }
}
```

#### `src/app/resume/about-me/about-me.component.ts`
```ts
export class AboutMeComponent implements OnInit {
  constructor(
    private readonly model: AboutMeViewModel,
    private readonly aboutMeService: AboutMeService
  ) {}

  ngOnInit(): void {
    this.model.inIt().subscribe();
  }
}
```

### Optional refinement
If the base component should remain, inject the view model through the constructor and make the base class abstract without a `@Component` decorator.

---

## 3. Harden base class lifecycle and naming

### Problem
- `BaseComponent` calls `unsubscribe()` on an uninitialized subscription.
- Method name `intializeModel` is misspelled.
- `@Component` on an abstract base class is unusual.

### Goal
Make the base class safe and idiomatic.

### Recommended changes
- Check `this.subscription` before unsubscribing.
- Rename `intializeModel` to `initializeModel`.
- Remove `@Component` from `BaseComponent` or change it to `@Directive` if it must be metadata-driven.

### Code examples
#### `src/app/shared-module/components/base-component/base-component.ts`
```ts
export abstract class BaseComponent<T> implements OnDestroy {
  private _model?: IViewModel<T>;
  private subscription?: Subscription;

  protected abstract readonly _context: ViewModelContext;

  constructor(protected injector: Injector) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  initializeModel(): void {
    this._model = ViewModelFactory.getViewModelInstance(this._context, this.injector);
    this.autoUnsubscribe();
  }

  private autoUnsubscribe(): void {
    if (!this._model) {
      throw new Error('Model must be initialized before subscribing');
    }
    this.subscription = this._model.inIt().subscribe();
  }
}
```

---

## 4. Improve shared module exports and feature module providers

### Problem
- `SharedModule` exports material modules without clear reuse rationale.
- `ResumeModule` re-provides HTTP client.

### Goal
Keep shared module exports minimal and avoid duplicate provider registration.

### Recommended changes
- Export only components and modules used by other feature modules.
- Remove `provideHttpClient` from `ResumeModule`.

### Code examples
#### `src/app/shared-module/shared.module.ts`
```ts
@NgModule({
  declarations: [ProgressBarComponent, ShowMessageDialogComponent],
  imports: [CommonModule, MatIconModule, ClipboardModule, MatDialogModule, MatButtonModule],
  exports: [ProgressBarComponent, ShowMessageDialogComponent, MatIconModule, ClipboardModule]
})
export class SharedModule {}
```

---

## 5. Align interfaces and tokens with Angular best practice

### Problem
- Abstract class `IFakeHttps` is treated like an injectable service contract.
- `FakeHttpsService` uses a raw JSON import and manual delay logic.

### Goal
Use interfaces and injection tokens consistently, and keep fake backend isolated.

### Recommended changes
- Convert `IFakeHttps` to a plain interface plus `InjectionToken`.
- Keep `FakeHttpsService` as a normal `@Injectable({ providedIn: 'root' })`.
- If needed, provide a real `HttpClient` proxy or adapter instead of fabricating the class manually.

### Code examples
#### `src/app/shared-module/services/fake-https.service.ts`
```ts
@Injectable({ providedIn: 'root' })
export class FakeHttpsService implements IFakeHttps {
  get<T>(url: string): Observable<HttpResponse<T>> {
    const data = this.getResponse<T>(url);
    return of(data).pipe(delay(2000));
  }
}
```

---

## Additional recommended refactors

- Replace `window.open(...)` with anchor tags in templates for accessibility and security.
- Prefer `readonly` for injected dependencies where possible.
- Extract shared command logic from `BaseService` into a separate helper if not every service requires it.
- Add ESLint and Angular styleguide checks if not already configured.
- Consider naming `ResumeModule` route path `resume` instead of `home` if the app is a resume feature.

## Suggested file-by-file work plan

1. `src/app/shared-module/interfaces/i-fake-https.ts`
   - Convert abstract class into interface + token.
2. `src/app/shared-module/services/fake-https.service.ts`
   - Keep injectable implementation, remove provider metadata from interface.
3. `src/app/app.module.ts`
   - Provide `provideHttpClient(withInterceptorsFromDi())` and register `FAKE_HTTPS` if needed.
4. `src/app/resume/resume.module.ts`
   - Remove duplicate HTTP provider.
5. `src/app/shared-module/components/base-component/base-component.ts`
   - Rename method and guard subscription.
6. `src/app/shared-module/factories/view-model-factory.ts`
   - Replace with DI-based solution or a provider map.
7. All `resume/*` component files
   - Inject view models directly and remove manual factory usage.
8. `src/app/shared-module/shared.module.ts`
   - Clean up exports.

## Estimated impact

- Cleaner DI and provider setup
- Better testability and reduced hidden coupling
- Increased extensibility for future view models
- More idiomatic Angular codebase with improved maintainability

## Notes

This plan is intentionally advisory and does not implement code changes. It is designed to guide a refactor with concrete file names, code examples, and rationale.
