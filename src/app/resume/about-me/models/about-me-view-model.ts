import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IPerson } from "src/app/shared-module/interfaces/i-person-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { AboutMeService } from "../services/about-me.service";

export class AboutMeViewModel extends ViewModel<IPerson> {

    // Private property to hold the AboutMeService instance
    private _aboutMeService: AboutMeService;

    // Constructor to inject dependencies
    constructor(protected injector: Injector) {
        super();
        // Get the AboutMeService instance from the injector
        this._aboutMeService = injector.get(AboutMeService);
    }

    // Method to attach view handler and fetch data from the API
    public attachViewHandler = (): Observable<void> => {
        return this._aboutMeService.attachViewApiHandler<IPerson>().pipe(
            // Use tap to assign the result to the data property
            tap(result => this.data = result),
            // Map the result to void
            map(() => { })
        );
    }

    // Method to attach command handler and execute commands via the API
    public attachCommandHandler = (): Observable<void> => {
        return this._aboutMeService.attachCommandApiHandler<string>().pipe(
            // Map the result to void
            map(() => { })
        );
    }

}
