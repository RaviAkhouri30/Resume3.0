import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { IHighlight } from "src/app/shared-module/interfaces/i-highlight";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ProfileStore } from "../services/profile.store";

@Injectable()
export class AboutMeViewModel extends ViewModel<PersonDataModel | null> {

    private readonly profileStore: ProfileStore = inject(ProfileStore);

    /**
     * Headline figures. Years of experience are derived from the career start
     * date, so the number stays correct without editing the data every year.
     */
    public readonly highlights: Signal<IHighlight[]> = computed(() => {
        const person = this.data();
        if (!person) {
            return [];
        }

        const years = person.yearsOfExperience();
        const experience: IHighlight[] = years === null ? [] : [{ value: years, label: 'Years of Experience' }];
        return [...experience, ...person.highlights];
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
