# Code Review – 2026-10-30

Scope: whole application (Angular 22), hosting configuration, dependencies and Firestore.
Every finding below has been fixed on the `refactor/code` branch unless it is listed under
"Open recommendations".

## Security

| Severity | Finding | Resolution |
|---|---|---|
| Critical | Firestore rules allowed `write` for **any** authenticated user on `resumes/**`. The browser API key is public by design, so anyone able to create an account in the project could overwrite the portfolio. | New `firestore.rules` (versioned in the repo): only `get` of `resumes/{userId}/resume/{section}`; listing and all client writes denied. Released and verified (public GET 200, LIST 403, WRITE 403). |
| High | `npm audit`: 21 vulnerabilities (3 critical, 15 high), including two caused by stale `overrides` that pinned vulnerable versions (`fast-uri`, `body-parser`). | Updated Angular to 22.2.x, removed unused packages, removed stale overrides. **0 vulnerabilities.** CI now runs `npm audit --omit=dev --audit-level=high`. |
| High | A passport photo (`Ravi_Passport.jpg`) was deployed publicly under `assets/` and is in Git history. | Removed from the build. It remains in Git history (see open recommendations). |
| Medium | Date of birth stored in the publicly readable `about-me` document although the site never displays it. | Removed from Firestore (kept in the local backup). |
| Medium | No Content-Security-Policy, `X-Frame-Options`, `Referrer-Policy` or `Permissions-Policy`. | Added in `src/staticwebapp.config.json`; verified the production build runs under the CSP without violations. |
| Medium | Firebase Auth SDK shipped to the browser and write methods (`post/put/patch`) on the backend adapter although the site never writes. | `IHttpBackend` is now read-only; Auth is no longer loaded. |
| Low | `window.open(link)` without `noopener`; external links without `rel`. | Real `<a target="_blank" rel="noopener noreferrer">` links. |
| Low | Contact form had no length limits or spam protection; EmailJS keys hard-coded in the component. | Max lengths, honeypot field, double-submit protection (`exhaustMap`); keys moved to `environment`. |
| Low | CI used `actions/checkout@v3` and persisted the job token in the checkout. | `checkout@v4`, `persist-credentials: false`, npm cache, tests and audit before deploy. |

## Correctness bugs

| Finding | Where (before) | Resolution |
|---|---|---|
| Loader was shown in `tap` *after* the response arrived, so it never covered the pending request; a single shared, mutable cancel subscriber meant one request could cancel another's timer. | `https-error-handler.ts` | Rewritten with `defer` → `timeout` → `catchError` → `finalize`; `LoaderService` counts in-flight requests. Covered by tests (concurrency, timeout, error paths). |
| Non-2xx responses were converted to a plain `Error`, losing the status, and were never shown to the user. | `https-error-handler.ts` | Typed `HttpStatusError` / `RequestTimeoutError`; user-facing snackbar plus console detail. |
| `FakeHttpsService` threw synchronously from `post/put/patch/isAuthenticated`; the factory's fallback returned a raw `HttpClient` that does not honour the `HttpResponse` contract (LSP violation). | `fake-https.service.ts`, `api-service-provider-factory.ts` | Contract reduced to `get`; adapters never throw; factory replaced by `provideHttpBackend()`. |
| Copy command removed **all spaces** from copied text. | `command-service.ts` | Copies verbatim (tested). |
| Command subjects were `BehaviorSubject`s seeded with empty/`undefined` commands, emitting phantom commands on subscribe. | `command-service.ts` | Plain `Subject`; unused dialog/download commands removed. |
| Introduction, awards and social links only received data if `AboutMeViewModel` happened to load first and push it into `CommonService` (temporal coupling). | `about-me-view-model.ts`, `common.service.ts` | `ProfileStore` fetches once with `shareReplay` and is read by every consumer (tested: one request, many subscribers). |
| `providers: [Location, …]` referenced the DOM's global `Location`, not Angular's. | `app-routing.module.ts` | Router removed (single page). |
| Hash routing turned in-page anchors (`#experience`) into router navigations that redirected to `#/home`. | routing | Plain in-page anchors with `scroll-padding-top` for the sticky header. |
| `ResumeModule` re-provided `HttpClient`, creating a second instance in the lazy injector. | `resume.module.ts` | Module removed; `HttpClient` is no longer needed at all. |
| "6+ years" was hard-coded. | `about-me.component.html` | Derived from `careerStartDate`; other figures come from data. |
| Copyright year hard-coded to 2024. | footer | Computed. |
| Awards descriptions for Wipro and LTIMindtree were swapped in the data. | Firestore | Fixed while updating content from the 2026 resume. |
| Test suite did not compile (13 errors) and contained only "should create" stubs. | `*.spec.ts` | Replaced with 40 behaviour-focused tests. |

## MVVM, OOP and SOLID

| Principle | Before | After |
|---|---|---|
| **MVVM** | Components held logic (timeline mapping getters, mutating `isCopied` on models, sending email, building forms). View models were root singletons for some sections and component-scoped for others. | Components only declare their view model. View models own state (`data` signal), derived values (`computed`), commands and form state, and are always component-scoped. |
| **SRP** | `CommandService` mixed clipboard, downloads, dialogs and HTTP; `HttpsErrorHandler` mixed loader, timeout, cancellation and validation with shared mutable state. | `CommandService` only executes copy commands; downloads are plain links; the request pipeline is a small, stateless function of the request. |
| **OCP** | Adding a backend meant editing the factory's `if` chain; adding a feature service meant re-implementing the fetch. | Backend registry in `provideHttpBackend()`; `ApiBaseService<T>` Template Method — a new section needs only `endpoint` and type. |
| **LSP** | Backends threw or returned a different shape (`HttpClient`). | Every adapter returns `Observable<HttpResponse<T>>` and reports failures as responses. |
| **ISP** | Read-only app depended on a read/write/auth interface. | `IHttpBackend` exposes only `get`. Unused interfaces (`IFakeHttps`, `IResponseModel`, `IOpenDialogModel`, `IDownload`, …) removed. |
| **DIP** | `ApiServiceProviderFactory` constructed concrete classes with `new`; `attachViewDataHandler<T>()` let callers pick any `T`. | DI chooses the adapter; each service fixes its payload type at the class level. |
| **OOP / encapsulation** | ~600 lines of getter/setter boilerplate exposing public setters (no real encapsulation); arrow-function "methods" that could not be overridden via `super`. | Immutable data models that normalise missing backend fields; real methods with `override`; `ViewModel.data` is read-only to views. |

## Performance

| Change | Effect |
|---|---|
| Firestore Lite instead of the full SDK; no Firebase Auth | Smaller bundle; no long-lived WebChannel connection (the old site never reached "network idle"). |
| Standalone components + `@defer (on viewport)` for the contact form | Forms + Material form field (≈119 kB raw) load only when the footer is visible. |
| Zoneless + OnPush + signals; `zone.js` removed | No change detection on every DOM event. |
| Text magnifier: native listeners, one shared scroll listener (was a document `mouseover` + window `scroll` listener **per text element**) | Removes hundreds of global handlers and the change detection they triggered on every mouse move. |
| EmailJS loaded on demand | Not downloaded unless a message is sent. |
| Bootstrap reboot + grid only (no component CSS); Inter as the only web font; unused Lobster/Inconsolata/Roboto/Material Icons removed | Less render-blocking CSS and fewer font requests. |
| Profile image 2.2 MB PNG → 27 kB AVIF (87 kB JPEG fallback) with dimensions and `fetchpriority="high"`, preloaded | Faster LCP, no layout shift. |
| ~33 MB of unused assets removed from the deployment (old PDFs, 12 MB PNG, backgrounds) | Deployment is ~1.8 MB. |
| Long-lived `immutable` caching for hashed bundles | Faster repeat visits. |

Initial JavaScript + CSS transfer: **270 kB → 127 kB** (−53%).

## SEO and accessibility

- Title, description, canonical URL, Open Graph and Twitter cards, `schema.org/Person` JSON-LD, `robots.txt` and
  `sitemap.xml` (previously `/robots.txt` returned the HTML page).
- One `h1` (name and role) and an `h2` for every section; `header`/`nav`/`main`/`footer` landmarks; skip link.
- Clickable `div`/`span` elements replaced by links and buttons with accessible names; decorative icons hidden
  from assistive technology; visible focus styles; `prefers-reduced-motion` respected; form errors announced.

## Open recommendations

1. **Remove the passport photo from Git history** (e.g. `git filter-repo --path src/assets/Ravi_Passport.jpg --invert-paths`
   followed by a force-push) – the repository is public. Large old PDFs/PNGs could be purged the same way to
   shrink clones.
2. **Restrict the Firebase browser key** in Google Cloud: HTTP referrer `raviakhouri.in/*` and API restriction to
   the Cloud Firestore API. Consider Firebase App Check.
3. **Service-account keys**: several `resume-builder-…-firebase-adminsdk-*.json` keys exist locally. Delete unused
   keys in Google Cloud (IAM → Service accounts → Keys) and keep a single one outside the repository.
4. **EmailJS**: limit allowed origins to `raviakhouri.in` and enable rate limiting in the EmailJS dashboard.
5. **Prerendering (SSG)** with `@angular/ssr` would let crawlers and social previews see the full content without
   running JavaScript; it requires reading Firestore at build time in CI.
6. **Bootstrap Icons font** (~130 kB woff2) could be replaced by the ~20 inline SVG icons actually used.
7. Pin GitHub Actions to commit SHAs rather than tags.
