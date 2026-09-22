# Code Review: Resume3.0

## Summary

This repository shows an intentional layer separation between components, services, and view-model logic. The structure is modular with a dedicated `resume` feature module, a `shared-module` for common services and components, and a root `AppModule` with routing.

Current state update: the project has adopted a backend abstraction centered on `IHttpBackend`, with a Firestore implementation in `FirebaseBackendService`. This is a clearer separation than the earlier mock-only design and keeps the feature layer independent from storage-specific details.

The current data contract is `resumes/{userId}/resume/{section}`. Development
uses the nested JSON fixture, while production uses the equivalent Firestore
documents. Array sections are stored in Firestore under an `items` field and
unwrapped by the adapter before feature services consume them.

However, the current implementation is not a fully clean-architecture design. It mixes Angular idioms with custom factory-based object creation, which introduces brittle patterns and hidden dependency flows.

## Clean Architecture / Layering

### What works well
- The app is separated into a root module (`AppModule`), a feature module (`ResumeModule`), and a shared module (`SharedModule`).
- Service classes such as `BaseService` and specific resume services (`AboutMeService`, etc.) cleanly encapsulate API access and command logic.
- The use of a view-model layer (`AboutMeViewModel`, `ExperienceViewModel`, etc.) is a good attempt to decouple view logic from component logic.

### Areas that break clean architecture
- The `ViewModelFactory` uses a switch on `ViewModelContext` and numeric enum values. This is a hidden coupling point and not easily extensible.
- `BaseComponent` creates view model instances via a manual factory instead of using Angular DI. That hides dependencies and reduces testability.
- `ServiceProviderFactory` switches on environment configuration to choose the fake backend or Firebase adapter. This is acceptable for the current application, but production code should eventually prefer Angular provider configuration with a proper injection token instead of manually constructing `HttpClient`.
- `IFakeHttps` is implemented as an abstract class decorated with `@Inject({ providedIn: 'root' })`. This is not idiomatic Angular. If you want an injection contract, use an interface plus `InjectionToken`, or an abstract class without provider metadata.

## SOLID Principles

### Single Responsibility Principle
- Most classes are focused, e.g. service classes handle API access and view models handle data preparation.
- `BaseComponent` mixes lifecycle subscription management with view model initialization. This is okay, but the class is more of a framework helper than a pure responsibility.

### Open/Closed Principle
- The current factory approach is not open for extension without modification. Adding a new view-model requires editing `ViewModelFactory` and `ViewModelContext`.

### Liskov Substitution Principle
- In general, service inheritance works, but `BaseService` couples all child services to a copy/notification command pipeline even if some child services may not need it.

### Interface Segregation Principle
- `BaseService` provides `attachCommandApiHandler` to all descendants, which may be more than some need. It may be better to separate command-related behavior into a smaller helper.

### Dependency Inversion Principle
- Some inversion is present via abstract services and a factory, but it is not fully idiomatic. The direct use of `inject(AboutMeService)` and `inject(IHttps)` in classes is okay in Angular 16+, but the factory approach undermines clean DI.

## Angular Practices and Recommendations

### Good Angular practices
- Lazy loading of `ResumeModule` in `AppRoutingModule` is correct.
- Feature modules import `CommonModule` and `FormsModule` as needed.
- `SharedModule` groups common UI pieces and exports reusable components.
- Use of `providedIn: 'root'` for services is good.

### Improvements needed
- `ResumeModule` should not call `provideHttpClient(withInterceptorsFromDi())` again if the root module already provides HTTP client support. `provideHttpClient` belongs in root only.
- Avoid using `window.open(...)` directly in components. Prefer templates with anchor tags and `target="_blank" rel="noopener noreferrer"` for security and Angular compatibility.
- `BaseComponent` should guard `subscription` unsubscription in `ngOnDestroy` if `intializeModel` was never called.
- `intializeModel` appears to be misspelled; rename to `initializeModel` for clarity.
- If `BaseComponent` is only used as a logic base class, it should probably be marked with `@Directive` instead of `@Component`, or be a plain abstract class with no component metadata.
- Shared module exports should include only the modules/components actually reused by consumers. Avoid exporting both Material modules and components unless needed.
- Prefer `@Injectable()` on view-model classes if they depend on DI. That would eliminate the manual factory switch and improve testability.

## Specific Code Concerns

### `BaseComponent` (`src/app/shared-module/components/base-component/base-component.ts`)
- Uses manual injector-based factory creation instead of constructor DI.
- `ngOnDestroy` calls `this.subscription.unsubscribe()` without checking if `subscription` exists.
- `autoUnsubscribe` is defined as an arrow property. This is valid, but it is more common in Angular to use a normal private method.
- The class is decorated with `@Component`, which is unusual for an abstract base class.

### `IFakeHttps` (`src/app/shared-module/interfaces/i-fake-https.ts`)
- Declaring an abstract class with `@Inject` is not standard. Use an `InjectionToken<IFakeHttps>` or a plain interface plus provider alias.

### `ServiceProviderFactory` (`src/app/shared-module/factories/service-provider-factory.ts`)
- Constructing `HttpClient` manually via `new HttpClient(_httpHanlder)` is not typical. Let Angular provide `HttpClient` normally, or use an injection token for the mock and Firebase implementations.

### `ViewModelFactory` (`src/app/shared-module/factories/view-model-factory.ts`)
- Switch-case on numeric enum values is brittle and not extensible.
- Better approach: register view models with DI and inject the correct one into each component, or use a map keyed by enum values.

### `AboutMeService` and Similar Services
- The service correctly filters and maps HTTP responses, but it depends on low-level mock HTTP response handling. A simpler service API returning domain models would be cleaner.

## SOLID Review Table

| SOLID Principle | % Implemented | Review |
|---|---:|---|
| Single Responsibility Principle (SRP) | 75% | Most feature classes focus on one responsibility: components render, services fetch data, and view models adapt data. However, shared classes like `CommandService` mix several responsibilities (copy, dialog, and download actions). |
| Open/Closed Principle (OCP) | 68% | The base abstractions in `BaseComponent`, `ViewModel`, and `ApiBaseService` are extension-friendly, but several concrete classes still require direct modification to add new behaviors. |
| Liskov Substitution Principle (LSP) | 78% | Inheritance is mostly valid. Concrete components and services behave consistently with the base contracts they extend. |
| Interface Segregation Principle (ISP) | 56% | Several interfaces group too many operations together, and shared services expose broader contracts than every consumer needs. This makes the design less flexible and less granular. |
| Dependency Inversion Principle (DIP) | 80% | This is a strong area. High-level logic depends on abstractions such as `ApiBaseService`, `IViewModel`, and injected services rather than concrete implementations. |

Overall SOLID maturity: approximately 72% of the core concepts are implemented effectively.

## Overall Rating

- Clean architecture: partial. There is a layered architecture intent, but it is not fully realized.
- SOLID: partially followed. There are good separations, but the factory-based view-model instantiation, abstract service coupling, and command pipeline inheritance weaken the design.
- Angular best practices: mixed. The app uses modules, lazy loading, and DI, but also includes non-idiomatic patterns such as manual `HttpClient` creation, repeated HTTP provider registration, and abstract class injection metadata.

## Recommended Improvements

1. Replace `ViewModelFactory` with direct DI or a provider map.
2. Remove `@Inject` from abstract class `IFakeHttps`; prefer `InjectionToken` or plain interface.
3. Provide `HttpClient` only once at root, and use an Angular provider for fake/mock backend instead of manual factory construction.
4. Harden `BaseComponent` lifecycle handling and avoid the `@Component` decorator on an abstract base class.
5. Rename `intializeModel` to `initializeModel`.
6. Use template-driven or anchor-based external links instead of `window.open()`.
7. Consider splitting command-related responsibilities from `BaseService` if not all services need them.
8. Add Angular style guide checks or linting if not already present.

## Conclusion

This project has a sound modular intent, but it could be improved by embracing Angular's dependency injection and provider patterns more fully. The architecture is currently more of a hybrid custom framework than a clean Angular application, so tightening DI, simplifying factories, and reducing hidden coupling will make it much more maintainable.

## Current Refactor Review — 2026-09-23

### Scope and method

Reviewed the current working tree, with emphasis on the staged split of
`BaseService` into `ApiBaseService` and `CommandService`, the view-model
migrations, and the backend adapters. Findings are ordered by impact. Line
references describe the current working tree.

### Findings

| Priority | Finding | Evidence and impact | Recommendation |
|---|---|---|---|
| P0 — blocker | `CommandService` cannot be injected by most consumers. | `CommandService` is `@Injectable()` without a root provider and requires `COMMAND_CONTEXT` (`shared-module/services/command-service.ts:14-32`). The only provider pair is on `AboutMeComponent` (`resume/about-me/about-me.component.ts:15-18`). `IntroductionComponent`, `ContactComponent`, and the root-provided contact, education, and experience view models all inject `CommandService` without supplying either dependency. These sections will throw `NullInjectorError` as they are created. | Provide a command service and its context at every relevant component boundary. Provide the matching view model in that same component injector so it receives the same command-service instance; alternatively redesign the command API so context is passed with each command instead of being an injector-scoped token. |
| P0 — blocker | `AboutMeViewModel` has no provider. | It was changed from auto-provided `@Service()` to `@Injectable()` with no `providedIn` value (`resume/about-me/models/about-me-view-model.ts:10`), and it is not listed in the component providers. `inject(AboutMeViewModel)` in `AboutMeComponent` therefore has no provider to resolve. | Restore auto-provisioning or add `AboutMeViewModel` to the component providers. If it needs the local command service, prefer the latter. |
| P1 — high | HTTP failures lose their status and do not notify the user. | `HttpsErrorHandler.throwError()` creates a plain `Error` for non-2xx responses (`shared-module/services/https-error-handler.ts:103-106`), while `catchAndHandleError()` displays an error only for `HttpResponse` and `CustomTimeoutError` (`:115-120`). Fake/Firebase 404 and 500 responses therefore hide the loader but produce no user-visible error. | Preserve the `HttpResponse` (or throw a typed error containing its status) and handle it consistently. Cover 404, 500, and timeout paths with tests. |
| P1 — high | The backend abstraction is not substitutable across all advertised implementations. | `IHttpBackend` promises `Observable<HttpResponse<T>>` for every operation (`interfaces/i-http-backend.ts:10-24`). The fake backend synchronously throws for `post`, `put`, `patch`, and `isAuthenticated` (`services/fake-https.service.ts:33-48,66-68`), while the factory fallback returns a plain `HttpClient` (`factories/api-service-provider-factory.ts:30-31`). Default `HttpClient.get()` emits the body rather than `HttpResponse`; `HttpsErrorHandler` then filters it out (`https-error-handler.ts:71`). | Make every adapter honour the same contract. Either remove unsupported write/auth methods from the read-only contract or return documented observable errors. Wrap the HTTP-client fallback with an adapter using `observe: 'response'`. |
| P1 — high | Loading and timeout state are race-prone for simultaneous requests. | The loader is shown in `tap`, which runs only after a value is emitted (`https-error-handler.ts:69`), so it is not shown while the request is pending. The singleton stores one mutable cancellation subscriber for all calls (`:53,88-95`) and one request can unsubscribe another request's timer (`:107`). | Use `defer` to show the loader at subscription time and `finalize` to hide it. Apply `timeout` directly to each request and remove the shared subscriber/timer. Track concurrent requests with a count if one global loader is required. |
| P2 — medium | The dialog command stream emits invalid values. | The dialog subject is initialized as `undefined` and merged without a filter (`command-service.ts:35,49`); `openDialogModelCommand()` then emits an object cast to `IOpenDialogModel` rather than the declared `ICommand<IOpenDialogModel>` (`:70-71`). Subscribers receive an immediate `undefined` and later an object without command metadata. | Use a `Subject<ICommand<IOpenDialogModel<unknown>>>` with no initial value and construct a real command model before emitting. Avoid `any` and unsafe casts. |
| P3 — low | Copy commands alter the requested clipboard text. | The copy pipeline removes every regular space before copying (`command-service.ts:46`). This silently changes values such as addresses and formatted identifiers. | Copy `data.dataItem` unchanged; only normalise input when that is explicitly part of the feature requirement. |
| P3 — low | Reinitialising a base component creates an additional live subscription. | `BaseComponent.inIt()` subscribes each time it is invoked, but only the latest subscription is retained (`components/base-component/base-component.ts:18,29`). | Make initialisation idempotent, or dispose of the previous subscription before replacing it. |

### SOLID compliance — current assessment

These scores are an architectural review heuristic, not a test-coverage or
quality metric. The table supersedes the earlier percentage table for the
current refactor.

| Principle | Compliance | Assessment |
|---|---:|---|
| Single Responsibility Principle (SRP) | 55% | Feature data services are focused, but `CommandService` combines event storage, clipboard access, downloads, DOM manipulation, and notifications; `HttpsErrorHandler` combines loading, timeout/cancellation, response validation, and notification concerns. |
| Open/Closed Principle (OCP) | 50% | The adapter contract makes new backends possible, but adding a provider mode requires changing the factory, and command types require changes to the central service and merged stream. |
| Liskov Substitution Principle (LSP) | 35% | `FakeHttpsService` and the raw `HttpClient` fallback do not uphold the full `IHttpBackend` observable-response contract, so callers cannot safely substitute implementations. |
| Interface Segregation Principle (ISP) | 65% | Splitting command and API service interfaces is an improvement. `IHttpBackend` still forces read-only clients to depend on writes and authentication methods they do not use. |
| Dependency Inversion Principle (DIP) | 50% | Feature data services depend on `IHttpBackend`, which is good. Command consumers depend on the concrete `CommandService` and a locally configured token, creating fragile injector coupling. |
| **Overall (unweighted mean)** | **51%** | The refactor improves separation of data and commands, but the provider topology and broken backend substitutability currently outweigh that structural gain. |

### Validation

| Check | Result |
|---|---|
| `./node_modules/.bin/tsc -p tsconfig.app.json --noEmit --pretty false` | Passed on the current working tree. |
| `npm run build` | Did not complete: esbuild terminated with `fatal error: all goroutines are asleep - deadlock!`. This prevented a production-bundle result. |
| `npm test -- --watch=false --browsers=ChromeHeadless` | Did not reach the test suite; the Angular build phase exited with code 2 after `Building...` and emitted no diagnostic. |

## Follow-up Review — 2026-09-10

The current refactor has addressed the view-model lifecycle concerns described
above:

- Resume components inject their concrete view models directly with Angular DI.
- `BaseComponent` is now a `@Directive()` and owns only stream startup and safe
	teardown; the obsolete `initializeModel()` path was removed.
- View models use Angular `@Service()` metadata and `inject()` for service
	dependencies.
- `ViewModelFactory` and `ViewModelContext` remain deprecated compatibility
	APIs. The factory resolves instances through a supplied `Injector` instead
	of manually constructing DI-dependent classes.
- Tests for migrated view models use `TestBed.inject(...)`.
- The Angular 22 Karma configuration now declares `polyfills` as an array.

Remaining validation issue: the test command reaches compilation but still
fails on unrelated pre-existing placeholder specs, including `AppComponent`,
command constructors, data-model constructors, the abstract `ViewModel`, and
the outdated projects-experience spec. The application TypeScript check passes
with `npx tsc -p tsconfig.app.json --noEmit`.
