import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IPersonDataModel } from "src/app/shared-module/interfaces/i-person-data-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { AboutMeService } from "../services/about-me.service";
import { PersonDataModel } from "src/app/shared-module/models/person-data-model";
import { CommonService } from "src/app/shared-module/services/common.service";

export class AboutMeViewModel extends ViewModel<IPersonDataModel> {

    // Private property to hold the AboutMeService instance
    private readonly _aboutMeService: AboutMeService;
    private readonly _commonService: CommonService;

    // Constructor to inject dependencies
    constructor(protected injector: Injector) {
        super();
        // Get the AboutMeService instance from the injector
        this._aboutMeService = injector.get(AboutMeService);
        this._commonService = injector.get(CommonService);
    }

    // Method to attach view handler and fetch data from the API
    protected override attachViewHandler = (): Observable<void> => {
        return this._aboutMeService.attachViewApiHandler<IPersonDataModel>().pipe(
            // Use tap to assign the result to the data property
            tap(result => this.data = new PersonDataModel(result)),
            tap(result => this._commonService.aboutMeData = result),
            // Map the result to void
            map(() => { })
        );
    }

    // Method to attach command handler and execute commands via the API
    protected override attachCommandHandler = (): Observable<void> => {
        return this._aboutMeService.attachCommandApiHandler<string>().pipe(
            // Map the result to void
            map(() => { })
        );
    }

}
