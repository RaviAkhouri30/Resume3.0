import { Injector } from "@angular/core";
import { EMPTY, map, Observable, tap } from "rxjs";
import { Hobbies } from "src/app/shared-module/models/hobbies";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { HobbiesService } from "../services/hobbies.service";
import { IHobbies } from "src/app/shared-module/interfaces/i-hobbies";

export class HobbiesViewModel extends ViewModel<Hobbies[]> {

    private readonly _hobbiesService: HobbiesService;

    constructor(protected injector: Injector) {
        super();
        this._hobbiesService = injector.get(HobbiesService);
    }

    protected override attachViewHandler = (): Observable<Hobbies[]> => {
        return this._hobbiesService.attachViewDataHandler<IHobbies[]>().pipe(
            tap(result => this.data = result.map(hobby => new Hobbies(hobby))),
            map(() => this.data)
        );
    }

    protected override attachCommandHandler = (): Observable<any> => {
        return EMPTY.pipe();
    }

}
