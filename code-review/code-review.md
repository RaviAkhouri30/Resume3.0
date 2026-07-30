# Code Review: Resume3.0

## Summary

This repository shows an intentional layer separation between components, services, and view-model logic. The structure is modular with a dedicated `resume` feature module, a `shared-module` for common services and components, and a root `AppModule` with routing.

However, the current implementation is not a fully clean-architecture design. It mixes Angular idioms with custom factory-based object creation, which introduces brittle patterns and hidden dependency flows.

## Clean Architecture / Layering

### What works well
- The app is separated into a root module (`AppModule`), a feature module (`ResumeModule`), and a shared module (`SharedModule`).
- Service classes such as `BaseService` and specific resume services (`AboutMeService`, etc.) cleanly encapsulate API access and command logic.
- The use of a view-model layer (`AboutMeViewModel`, `ExperienceViewModel`, etc.) is a good attempt to decouple view logic from component logic.

### Areas that break clean architecture
- The `ViewModelFactory` uses a switch on `ViewModelContext` and numeric enum values. This is a hidden coupling point and not easily extensible.
- `BaseComponent` creates view model instances via a manual factory instead of using Angular DI. That hides dependencies and reduces testability.
- `ServiceProviderFactory` switches on environment configuration to choose `HttpClient` or `FakeHttpsService`. This is acceptable for a dev mock, but production code should prefer Angular provider configuration with a proper injection token instead of manually constructing `HttpClient`.
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
- Constructing `HttpClient` manually via `new HttpClient(_httpHanlder)` is not typical. Let Angular provide `HttpClient` normally, or use an injection token for the mock implementation.

### `ViewModelFactory` (`src/app/shared-module/factories/view-model-factory.ts`)
- Switch-case on numeric enum values is brittle and not extensible.
- Better approach: register view models with DI and inject the correct one into each component, or use a map keyed by enum values.

### `AboutMeService` and Similar Services
- The service correctly filters and maps HTTP responses, but it depends on low-level mock HTTP response handling. A simpler service API returning domain models would be cleaner.

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
