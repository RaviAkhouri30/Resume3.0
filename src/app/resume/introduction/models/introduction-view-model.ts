import { inject, Service } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { IntroductionService } from "../services/introduction.service";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";

@Service()
export class IntroductionViewModel extends ViewModel<PersonDataModel> {

    private readonly introductionService: IntroductionService = inject(IntroductionService);

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
