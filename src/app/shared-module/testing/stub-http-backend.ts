import { HttpResponse } from '@angular/common/http';
import { Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHttpBackend } from '../interfaces/i-http-backend';

/** Synchronous in-memory backend for tests: maps a section name to its payload. */
export class StubHttpBackend implements IHttpBackend {
    public readonly requestedUrls: string[] = [];

    constructor(private readonly sections: Record<string, unknown>) { }

    get<T>(url: string): Observable<HttpResponse<T>> {
        this.requestedUrls.push(url);
        const section = url.replace(`${environment.baseUrl}/`, '');
        return of(section in this.sections
            ? new HttpResponse<T>({ status: 200, body: this.sections[section] as T })
            : new HttpResponse<T>({ status: 404, statusText: 'Not Found' }));
    }
}

export function provideStubHttpBackend(sections: Record<string, unknown>): Provider {
    return { provide: IHttpBackend, useValue: new StubHttpBackend(sections) };
}

/** Profile document used across specs. */
export const PROFILE_FIXTURE = {
    firstName: 'Ravi',
    name: 'Ravi Akhouri',
    jobTitle: 'Senior Angular Developer',
    summary: 'Builds Angular apps.',
    github: 'https://github.com/example',
    linkedin: '',
    careerStartDate: '2019-10-01',
    highlights: [{ value: 10, label: 'Projects Delivered' }],
    awardsAndAchievements: [{ title: 'Star Award', desc: 'For SOLID.' }]
};
