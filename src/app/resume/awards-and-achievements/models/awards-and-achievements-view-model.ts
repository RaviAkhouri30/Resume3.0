import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { mapAwardAndAchievementToTimelineItem } from "src/app/shared-module/helper-functions/transform-to-timeline";
import { IAwardAchievements } from "src/app/shared-module/interfaces/i-awards-achievements";
import { ITimeline } from "src/app/shared-module/interfaces/i-timeline";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { ProfileStore } from "../../about-me/services/profile.store";

@Injectable()
export class AwardsAndAchievementsViewModel extends CollectionViewModel<IAwardAchievements> {

    private readonly profileStore: ProfileStore = inject(ProfileStore);

    /** Awards prepared for the shared timeline component. */
    public readonly timeline: Signal<ITimeline[]> = computed(() => this.data().map(mapAwardAndAchievementToTimelineItem));

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.profileStore.profile$.pipe(
            tap(profile => this.setData(profile.awardsAndAchievements))
        );
    }
}
