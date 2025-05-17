import { Injector } from "@angular/core";
import { EMPTY, Observable, tap } from "rxjs";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { CommonService } from "src/app/shared-module/services/common.service";

export class HobbiesViewModel extends ViewModel<string[]>{
    private _commonService: CommonService;
    
        constructor(protected injector: Injector) {
            super();
            this._commonService = injector.get(CommonService);
        }
    
        protected override attachViewHandler = (): Observable<any> => {
            return this._commonService.aboutMeData.pipe(
                tap(result => this.data = result.hobbies)
            );
        }
    
        protected override attachCommandHandler = (): Observable<any> => {
            return EMPTY.pipe();
        }
    
}
