import { Injector } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IFakeHttps } from "src/app/shared-module/interfaces/i-fake-https";
import { IPerson } from "src/app/shared-module/interfaces/i-person-model";
import { ViewModel } from "src/app/shared-module/models/view-model";

export class AboutMeViewModel extends ViewModel<IPerson> {
    private _http: IFakeHttps;

    constructor(protected injector: Injector) {
        super();
        this._http = injector.get(IFakeHttps);
    }

    attachViewHandler = (): Observable<void> => {
        return this._http.get<IPerson>('about-me').pipe(
            map((res) => this.data = res.data),
            tap(() => console.log('Person data fetched  ', this.data)),
            map(() => { })
        );
    }

    attachCommandHandler = (): Observable<void> => {
        return new Observable<void>((observer) => {
            observer.next();
            observer.complete();
        });
    }
} 
