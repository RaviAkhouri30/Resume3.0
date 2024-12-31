import { Injector } from "@angular/core";
import { AboutMeViewModel } from "src/app/resume/about-me/models/about-me-view-model";
import { ViewModelContext } from "../enums/view-model-context";
import { ViewModel } from "../models/view-model";

export class ViewModelFactory {
    static getViewModelInstance = (viewContext: ViewModelContext, injector: Injector): ViewModel<any> => {
        switch (viewContext) {
            case 0 /* AboutMeComponent */:
                return new AboutMeViewModel(injector);
            default:
                throw new Error('Invalid ViewModel Context');
        }
    }
}
