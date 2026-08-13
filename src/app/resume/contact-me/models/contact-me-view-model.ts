import { EMPTY, Observable } from "rxjs";
import { ContactMe } from "src/app/shared-module/models/contact-me";
import { ViewModel } from "src/app/shared-module/models/view-model";

export class ContactMeViewModel extends ViewModel<ContactMe> {

    protected override attachViewHandler = (): Observable<any> => {
        return EMPTY;
    }
    protected override attachCommandHandler = (): Observable<any> => {
        return EMPTY;
    }

}
