import { Observable } from "rxjs";
import { ContactMe } from "src/app/shared-module/models/contact-me";
import { ViewModel } from "src/app/shared-module/models/view-model";

export class ContactMeViewModel extends ViewModel<ContactMe> {

    protected override attachViewHandler = (): Observable<any> => {
        throw new Error('Not Implemented');
    }
    protected override attachCommandHandler = (): Observable<any> => {
        throw new Error('Not Implemented');
    }

}
