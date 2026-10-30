import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { ProfessionalSkillsDataModel } from "src/app/shared-module/models/professional-skills-data-model";
import { CollectionViewModel } from "src/app/shared-module/models/view-model";
import { ProfessionalSkillsService } from "../services/professional-skills.service";

@Injectable()
export class ProfessionalSkillsViewModel extends CollectionViewModel<ProfessionalSkillsDataModel> {

    private readonly service: ProfessionalSkillsService = inject(ProfessionalSkillsService);

    constructor() {
        super();
    }

    protected override attachViewHandler(): Observable<unknown> {
        return this.service.attachViewDataHandler().pipe(
            tap(result => this.setData(result.map(skill => new ProfessionalSkillsDataModel(skill))))
        );
    }
}
