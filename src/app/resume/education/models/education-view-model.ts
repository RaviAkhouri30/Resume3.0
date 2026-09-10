import { Observable, tap } from "rxjs";
import { IEducationDataModel } from "src/app/shared-module/interfaces/i-education-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { EducationService } from "../services/education.service";
import { inject, Service } from "@angular/core";
import { ICommand } from "src/app/shared-module/interfaces/i-command";
import { EducationDataModel } from "src/app/shared-module/models/education-data-model";

@Service()
export class EducationViewModel extends ViewModel<IEducationDataModel[]> {

    private _educationService: EducationService = inject(EducationService);

    override attachViewHandler = (): Observable<any> => {
        return this._educationService.attachViewDataHandler<IEducationDataModel[]>().pipe(
            tap(result => this.data = result.map(education => new EducationDataModel(education)))
        );
    }

    override attachCommandHandler = (): Observable<ICommand<any>> => {
        return this._educationService.attachCommandApiHandler().pipe();
    }
}
