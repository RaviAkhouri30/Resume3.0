import { map, Observable, tap } from "rxjs";
import { IExperienceDataModel } from "src/app/shared-module/interfaces/i-experience-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ExperienceService } from "../services/experience.service";
import { Injector } from "@angular/core";
import { ExperienceDataModel } from "src/app/shared-module/models/experience-data-model";

/**
 * The `ExperienceViewModel` class extends the `ViewModel` class and is responsible for managing
 * the experience data model in the application.
 * 
 * @extends ViewModel<IExperienceDataModel[]>
 */
export class ExperienceViewModel extends ViewModel<IExperienceDataModel[]> {

    /**
     * The service used to manage experience data.
     * @private
     */
    private _experienceService: ExperienceService;

    /**
     * Constructs an instance of `ExperienceViewModel`.
     * 
     * @param injector - The injector used to get the `ExperienceService`.
     */
    constructor(protected injector: Injector) {
        super();
        this._experienceService = injector.get(ExperienceService);
    }

    /**
     * Attaches the view handler to the experience service.
     * 
     * @returns An observable that emits when the view handler is attached.
     */
    protected override attachViewHandler = (): Observable<void> => {
        return this._experienceService.attachViewApiHandler<IExperienceDataModel[]>().pipe(
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
        return this._experienceService.attachCommandApiHandler().pipe();
    }
}
