import { map, Observable, tap } from "rxjs";
import { IExperienceDataModel } from "src/app/shared-module/interfaces/i-experience-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ExperienceService } from "../services/experience.service";
import { inject, Service } from "@angular/core";
import { ExperienceDataModel } from "src/app/shared-module/models/experience-data-model";
import { CommandService } from "src/app/shared-module/services/command-service";

/**
 * The `ExperienceViewModel` class extends the `ViewModel` class and is responsible for managing
 * the experience data model in the application.
 * 
 * @extends ViewModel<IExperienceDataModel[]>
 */
@Service()
export class ExperienceViewModel extends ViewModel<IExperienceDataModel[]> {

    /**
     * The service used to manage experience data.
     * @private
     */
    private _experienceService: ExperienceService = inject(ExperienceService);
    private _commandService: CommandService = inject(CommandService);

    /**
     * Attaches the view handler to the experience service.
     * 
     * @returns An observable that emits when the view handler is attached.
     */
    protected override attachViewHandler = (): Observable<void> => {
        return this._experienceService.attachViewDataHandler<IExperienceDataModel[]>().pipe(
            tap(result => this.data = result.map(e => new ExperienceDataModel(e))),
            map(() => { })
        );
    }

    /**
     * Attaches the command handler.
     * 
     * @returns An observable that emits when the command handler is attached.
     */
    protected override attachCommandHandler = (): Observable<any> => {
        return this._commandService.attachCommandApiHandler().pipe();
    }
}
