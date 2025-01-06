import { Observable, tap } from "rxjs";
import { IProfessionalSkillsDataModel } from "src/app/shared-module/interfaces/i-professional-skills";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { ProfessionalSkillsService } from "../services/professional-skills.service";
import { Injector } from "@angular/core";
import { ProfessionalSkillsDataModel } from "src/app/shared-module/models/professional-skills-data-model";

export class ProfessionalSkillsViewModel extends ViewModel<IProfessionalSkillsDataModel[]> {
    private readonly _professionalSkillsService: ProfessionalSkillsService;

    constructor(protected injector: Injector) {
        super();
        this._professionalSkillsService = injector.get(ProfessionalSkillsService);
    }

    protected override attachViewHandler = (): Observable<any> => {
        return this._professionalSkillsService.attachViewApiHandler<IProfessionalSkillsDataModel[]>().pipe(
            tap(result => this.data = result.map(e => new ProfessionalSkillsDataModel(e)))
        );
    }
    protected override attachCommandHandler = (): Observable<any> => {
        return this._professionalSkillsService.attachCommandApiHandler().pipe();
    }
}
