import { Injector } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { CommonService } from "src/app/shared-module/services/common.service";

export class SocialMediaModel extends ViewModel<PersonDataModel> {

    private readonly _commonService: CommonService;

    constructor(protected injector: Injector) {
        super();
        this._commonService = injector.get(CommonService);
    }

    protected override attachViewHandler = (): Observable<void> => {
        return this._commonService.aboutMeData.pipe(
            tap(result => this.data = new PersonDataModel(result)),
            map(() => { })
        );
    };

    protected override attachCommandHandler = (): Observable<void> => {
        return of();
    };

}
