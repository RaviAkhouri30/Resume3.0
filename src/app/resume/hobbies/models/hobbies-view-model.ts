import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Hobbies } from "src/app/shared-module/models/hobbies";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { mapHobbiesToTimelineItem } from "src/app/shared-module/helper-functions/transform-to-timeline";
import { ITimeline } from "src/app/shared-module/interfaces/i-timeline";
import { HobbiesService } from "../services/hobbies.service";

@Injectable()
export class HobbiesViewModel extends CollectionViewModel<Hobbies> {

    private readonly service: HobbiesService = inject(HobbiesService);

    /** Items prepared for the shared timeline component. */
    public readonly timeline: Signal<ITimeline[]> = computed(() => this.data().map(mapHobbiesToTimelineItem));

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.service.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(item => new Hobbies(item))))
        );
    }
}
