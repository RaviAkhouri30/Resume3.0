import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { IDownloadLink, resumeDownload } from "src/app/shared-module/helper-functions/media";
import { environment } from "src/environments/environment";
import { ProfileStore } from "../../about-me/services/profile.store";

@Injectable()
export class IntroductionViewModel extends ViewModel<PersonDataModel | null> {

    private readonly profileStore: ProfileStore = inject(ProfileStore);

    /** Downloadable resume (Cloudinary, or the bundled asset when not configured). */
    public readonly resume: IDownloadLink = resumeDownload(environment.media);

    /** Whole years since the career start date, or null when it is unknown. */
    public readonly yearsOfExperience: Signal<number | null> = computed(() => this.data()?.yearsOfExperience() ?? null);

    constructor() {
        super(null);
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.profileStore.profile$.pipe(
            tap(profile => this.setData(profile))
        );
    }
}
