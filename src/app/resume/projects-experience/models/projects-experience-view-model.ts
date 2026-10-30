import { computed, inject, Injectable, Signal } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ProjectsExperienceDataModel } from "src/app/shared-module/models/projects-experience-data-model";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { mapProjectsToTimelineItem } from "src/app/shared-module/helper-functions/transform-to-timeline";
import { ITimeline } from "src/app/shared-module/interfaces/i-timeline";
import { ProjectsExperienceService } from "../services/projects-experience.service";

@Injectable()
export class ProjectsExperienceViewModel extends CollectionViewModel<ProjectsExperienceDataModel> {

    private readonly service: ProjectsExperienceService = inject(ProjectsExperienceService);

    /** Items prepared for the shared timeline component. */
    public readonly timeline: Signal<ITimeline[]> = computed(() => this.data().map(mapProjectsToTimelineItem));

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.service.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(item => new ProjectsExperienceDataModel(item))))
        );
    }
}
