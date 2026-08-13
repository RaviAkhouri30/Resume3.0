import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { IntroductionService } from "../services/introduction.service";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";

export class IntroductionViewModel extends ViewModel<PersonDataModel> {

    private readonly introductionService: IntroductionService;

    constructor(protected injector: Injector) {
        super();
        this.introductionService = injector.get(IntroductionService);
    }

    protected override attachViewHandler = (): Observable<void> => {
        return this.introductionService.attachViewDataHandler().pipe(
            tap(result => this.data = new PersonDataModel(result)),
            map(() => { })
        );
    }

    protected override attachCommandHandler = (): Observable<any> => {
        return this.introductionService.attachCommandApiHandler();
    }

}
