import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IContactDetails } from 'src/app/shared-module/interfaces/i-contact-details';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ApiBaseService<IContactDetails[]> {
  protected readonly endpoint = UrlConstants.contactDetails;
}
