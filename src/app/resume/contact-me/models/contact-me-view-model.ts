import { EMPTY, Observable } from "rxjs";
import { ContactMe } from "src/app/shared-module/models/contact-me";
import { ViewModel } from "src/app/shared-module/models/view-model";

/** View model for the contact form; it has no remote data or commands yet. */
export class ContactMeViewModel extends ViewModel<ContactMe> {

    /** Provides an empty data stream until contact submission is implemented. */
    protected override attachViewHandler = (): Observable<any> => {
        return EMPTY;
    }
    /** Provides an empty command stream until contact submission is implemented. */
    protected override attachCommandHandler = (): Observable<any> => {
        return EMPTY;
    }

}
