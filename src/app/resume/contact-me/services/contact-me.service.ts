import { Injectable } from '@angular/core';
import { defer, map, Observable, switchMap } from 'rxjs';
import { IContactMe } from 'src/app/shared-module/interfaces/i-contact-me';
import { environment } from 'src/environments/environment';

/** Sends contact-form messages through EmailJS. */
@Injectable({
  providedIn: 'root'
})
export class ContactMeService {

  /**
   * The EmailJS SDK is imported on demand, so it is only downloaded when a
   * visitor actually sends a message rather than on every page load.
   */
  public send(contact: IContactMe): Observable<void> {
    const { serviceId, templateId, publicKey } = environment.emailJs;

    return defer(() => import('@emailjs/browser')).pipe(
      switchMap(({ default: emailjs }) => emailjs.send(
        serviceId,
        templateId,
        { title: contact.email, name: contact.name, message: contact.message },
        { publicKey }
      )),
      map(() => undefined)
    );
  }
}
