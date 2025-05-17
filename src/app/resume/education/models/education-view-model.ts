import { Observable, tap } from "rxjs";
import { IEducationDataModel } from "src/app/shared-module/interfaces/i-education-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { EducationService } from "../services/education.service";
import { Injector } from "@angular/core";
import { ICommand } from "src/app/shared-module/interfaces/i-command";
import { EducationDataModel } from "src/app/shared-module/models/education-data-model";

export class EducationViewModel extends ViewModel<IEducationDataModel[]> {

    private _educationService: EducationService;

    constructor(protected injector: Injector) {
        super();
        this._educationService = injector.get(EducationService);
    }

    override attachViewHandler = (): Observable<any> => {
        return this._educationService.attachViewApiHandler<IEducationDataModel[]>().pipe(
            tap(result => this.data = result.map(education => new EducationDataModel(education)))
        );
    }

    override attachCommandHandler = (): Observable<ICommand<any>> => {
        return this._educationService.attachCommandApiHandler().pipe();
    }
}
