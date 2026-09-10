import { inject, Service } from "@angular/core";
import { Observable, tap, map } from "rxjs";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { IProjectsExperienceDataModel } from "src/app/shared-module/interfaces/i-projects-experience-data-model";
import { ProjectsExperienceService } from "../services/projects-experience.service";
import { ProjectsExperienceDataModel } from "src/app/shared-module/models/projects-experience-data-model";

@Service()
export class ProjectsExperienceViewModel extends ViewModel<ProjectsExperienceDataModel[]> {
    /**
    * The service used to manage experience data.
    * @private
    */
    private _projectsExperienceService: ProjectsExperienceService = inject(ProjectsExperienceService);

    /**
     * Attaches the view handler to the experience service.
     * 
     * @returns An observable that emits when the view handler is attached.
     */
    protected override attachViewHandler = (): Observable<void> => {
        return this._projectsExperienceService.attachViewDataHandler<IProjectsExperienceDataModel[]>().pipe(
            tap(result => this.data = result.map(e => new ProjectsExperienceDataModel(e))),
            map(() => { })
        );
    }

    /**
     * Attaches the command handler.
     * 
     * @returns An observable that emits when the command handler is attached.
     */
    protected override attachCommandHandler = (): Observable<any> => {
        return this._projectsExperienceService.attachCommandApiHandler().pipe();
    }
}
