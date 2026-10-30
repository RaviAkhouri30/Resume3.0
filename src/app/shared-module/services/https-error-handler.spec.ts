import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NEVER, of, Subject, throwError } from 'rxjs';
import { HttpsErrorHandler, REQUEST_TIMEOUT_MS } from './https-error-handler';
import { LoaderService } from './loader-service';
import { NotificationService } from './notification.service';

describe('HttpsErrorHandler', () => {
  let handler: HttpsErrorHandler;
  let loader: LoaderService;
  let notification: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    notification = jasmine.createSpyObj<NotificationService>('NotificationService', ['showError']);
    TestBed.configureTestingModule({
      providers: [{ provide: NotificationService, useValue: notification }]
    });
    handler = TestBed.inject(HttpsErrorHandler);
    loader = TestBed.inject(LoaderService);
  });

  it('unwraps the body of a successful response', () => {
    const values: string[] = [];
    handler.handleHttpsError(of(new HttpResponse({ status: 200, body: 'data' }))).subscribe(v => values.push(v));

    expect(values).toEqual(['data']);
    expect(notification.showError).not.toHaveBeenCalled();
  });

  it('reports a non-2xx response with its status and completes without a value', () => {
    let completed = false;
    const values: unknown[] = [];
    handler.handleHttpsError(of(new HttpResponse({ status: 404, statusText: 'Not Found' })))
      .subscribe({ next: v => values.push(v), complete: () => completed = true });

    expect(values).toEqual([]);
    expect(completed).toBeTrue();
    expect(notification.showError).toHaveBeenCalledOnceWith(404, 'Not Found');
  });

  it('reports errors thrown by the request', () => {
    handler.handleHttpsError(throwError(() => new Error('boom'))).subscribe();

    expect(notification.showError).toHaveBeenCalledOnceWith(0, 'boom');
  });

  it('shows the loader only while a request is pending and supports concurrent requests', () => {
    const first = new Subject<HttpResponse<string>>();
    const second = new Subject<HttpResponse<string>>();
    expect(loader.isLoading()).toBeFalse();

    handler.handleHttpsError(first).subscribe();
    handler.handleHttpsError(second).subscribe();
    expect(loader.isLoading()).toBeTrue();

    first.next(new HttpResponse({ status: 200, body: 'a' }));
    first.complete();
    expect(loader.isLoading()).withContext('second request still pending').toBeTrue();

    second.next(new HttpResponse({ status: 200, body: 'b' }));
    second.complete();
    expect(loader.isLoading()).toBeFalse();
  });

  describe('with a mocked clock', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('times out a request that never responds', () => {
      handler.handleHttpsError(NEVER).subscribe();

      jasmine.clock().tick(REQUEST_TIMEOUT_MS + 1);

      expect(notification.showError).toHaveBeenCalledOnceWith(408, 'Request timeout');
      expect(loader.isLoading()).toBeFalse();
    });
  });
});
