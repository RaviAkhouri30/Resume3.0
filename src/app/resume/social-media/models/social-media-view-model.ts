import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ProfileStore } from "../../about-me/services/profile.store";

export interface ISocialLink {
    label: string;
    icon: string;
    url: string;
}

@Injectable()
export class SocialMediaViewModel extends ViewModel<PersonDataModel | null> {

    private readonly profileStore: ProfileStore = inject(ProfileStore);

    /** Profile links that are actually configured. */
    public readonly links: Signal<ISocialLink[]> = computed(() => {
        const person = this.data();
        const links: ISocialLink[] = [
            { label: 'GitHub', icon: 'bi bi-github', url: person?.github ?? '' },
            { label: 'LinkedIn', icon: 'bi bi-linkedin', url: person?.linkedin ?? '' }
        ];
        return links.filter(link => link.url.startsWith('https://'));
    });

    constructor() {
        super(null);
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.profileStore.profile$.pipe(
            tap(profile => this.setData(profile))
        );
    }
}
