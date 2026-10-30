import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ExperienceDataModel } from "src/app/shared-module/models/experience-data-model";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { mapExperienceToTimelineItem } from "src/app/shared-module/helper-functions/transform-to-timeline";
import { ITimeline } from "src/app/shared-module/interfaces/i-timeline";
import { ExperienceService } from "../services/experience.service";

@Injectable()
export class ExperienceViewModel extends CollectionViewModel<ExperienceDataModel> {

    private readonly service: ExperienceService = inject(ExperienceService);

    /** Items prepared for the shared timeline component. */
    public readonly timeline: Signal<ITimeline[]> = computed(() => this.data().map(mapExperienceToTimelineItem));

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.service.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(item => new ExperienceDataModel(item))))
        );
    }
}
