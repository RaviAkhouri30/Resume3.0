import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { EducationDataModel } from "src/app/shared-module/models/education-data-model";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { mapEducationToTimelineItem } from "src/app/shared-module/helper-functions/transform-to-timeline";
import { ITimeline } from "src/app/shared-module/interfaces/i-timeline";
import { EducationService } from "../services/education.service";

@Injectable()
export class EducationViewModel extends CollectionViewModel<EducationDataModel> {

    private readonly service: EducationService = inject(EducationService);

    /** Items prepared for the shared timeline component. */
    public readonly timeline: Signal<ITimeline[]> = computed(() => this.data().map(mapEducationToTimelineItem));

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.service.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(item => new EducationDataModel(item))))
        );
    }
}
