import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { PersonDataModel } from 'src/app/shared-module/models/person-data-model';
import { AboutMeService } from './about-me.service';

/**
 * Single source of truth for the profile ("about-me") document.
 *
 * Several sections (introduction, about, awards, social links) display parts of
 * the profile. They all read from this store, which fetches the document once and
 * replays it, so no section depends on another section having loaded first.
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileStore {
  private readonly aboutMeService: AboutMeService = inject(AboutMeService);

  /** The profile, fetched lazily on first subscription and shared afterwards. */
  public readonly profile$: Observable<PersonDataModel> = this.aboutMeService.attachViewDataHandler().pipe(
    map(data => new PersonDataModel(data)),
    shareReplay({ bufferSize: 1, refCount: false })
  );
}
