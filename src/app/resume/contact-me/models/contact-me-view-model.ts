import { inject, Injectable } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { catchError, EMPTY, exhaustMap, Observable, Subject, tap } from "rxjs";
import { ContactMe } from "src/app/shared-module/models/contact-me";
import { ViewModel } from "src/app/shared-module/models/view-model";
import { NotificationService } from "src/app/shared-module/services/notification.service";
import { ContactMeService } from "../services/contact-me.service";

export type SendStatus = 'idle' | 'sending' | 'sent' | 'failed';

/** Limits that keep messages reasonable and match the EmailJS template. */
export const CONTACT_LIMITS = { name: 100, email: 254, message: 2000 } as const;

/**
 * View model for the contact form: owns the form state, validation and the
 * send workflow, so the component only binds to it.
 */
@Injectable()
export class ContactMeViewModel extends ViewModel<SendStatus> {

    private readonly contactMeService: ContactMeService = inject(ContactMeService);
    private readonly notificationService: NotificationService = inject(NotificationService);
    private readonly submissions = new Subject<ContactMe>();

    public readonly limits = CONTACT_LIMITS;

    public readonly form = inject(NonNullableFormBuilder).group({
        name: ['', [Validators.required, Validators.maxLength(CONTACT_LIMITS.name)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(CONTACT_LIMITS.email)]],
        message: ['', [Validators.required, Validators.maxLength(CONTACT_LIMITS.message)]],
        // Honeypot: hidden from people, often filled in by spam bots.
        website: ['']
    });

    constructor() {
        super('idle');
    }

    /** Validates the form and queues the message for sending. */
    public submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const { website, ...value } = this.form.getRawValue();
        if (website) {
            // Pretend success so bots get no signal, but send nothing.
            this.form.reset();
            return;
        }

        this.submissions.next(new ContactMe(value));
    }

    // `exhaustMap` ignores repeated clicks while a message is already being sent.
    protected override attachCommandHandler(): Observable<unknown> {
        return this.submissions.pipe(
            exhaustMap(contact => {
                this.setData('sending');
                return this.contactMeService.send(contact).pipe(
                    tap(() => this.onSent()),
                    catchError((err: unknown) => this.onFailed(err))
                );
            })
        );
    }

    private onSent(): void {
        this.setData('sent');
        this.form.reset();
        this.notificationService.showSuccess('Thanks! Your message has been sent.');
    }

    private onFailed(err: unknown): Observable<never> {
        this.setData('failed');
        const message = (err as { text?: string } | undefined)?.text ?? String(err);
        this.notificationService.showError(400, message);
        return EMPTY;
    }
}
