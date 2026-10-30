import { HttpResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FakeHttpsService } from './fake-https.service';

describe('FakeHttpsService', () => {
  const service = new FakeHttpsService();

  it('resolves the full nested path in the fake database', async () => {
    const response = await firstValueFrom(service.get<{ firstName: string }>('resumes/RS-PLACEHOLDER/resume/about-me'));

    expect(response.status).toBe(200);
    expect(response.body?.firstName).toBe('Lorem');
  });

  it('returns a 404 response (not an exception) for unknown paths', async () => {
    const response: HttpResponse<unknown> = await firstValueFrom(service.get('resumes/UNKNOWN/resume/about-me'));

    expect(response.status).toBe(404);
    expect(response.ok).toBeFalse();
  });
});
