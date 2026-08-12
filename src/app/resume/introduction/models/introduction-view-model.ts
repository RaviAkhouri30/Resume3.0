import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IPersonDataModel } from "src/app/shared-module/interfaces/i-person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { CommonService } from "src/app/shared-module/services/common.service";

export class IntroductionViewModel extends ViewModel<IPersonDataModel> {

    private readonly _commonService: CommonService;

    constructor(protected injector: Injector) {
        super();
        this._commonService = injector.get(CommonService);
    }

    protected override attachViewHandler = (): Observable<void> => {
        return this._commonService.aboutMeData.pipe(
            tap(result => this.data = result),
            map(() => { })
        );
    }

    protected override attachCommandHandler = (): Observable<void> => {
        return new Observable().pipe(
            map(() => { })
        );
    }

}
