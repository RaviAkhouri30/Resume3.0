import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IPerson } from "src/app/shared-module/interfaces/i-person-model";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { AboutMeService } from "../services/about-me.service";

export class AboutMeViewModel extends ViewModel<IPerson> {

    private _aboutMeService: AboutMeService;

    constructor(protected injector: Injector) {
        super();
        this._aboutMeService = injector.get(AboutMeService);
    }

    public attachViewHandler = (): Observable<void> => {
        return this._aboutMeService.attachViewApiHandler<IPerson>().pipe(
            tap(result => this.data = result),
            map(() => { })
        );
    }

    public attachCommandHandler = (): Observable<void> => {
        return this._aboutMeService.attachCommandApiHandler<string>().pipe(
            map(() => { })
        );
    }

} 
