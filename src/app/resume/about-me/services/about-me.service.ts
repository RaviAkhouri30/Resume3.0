import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService extends ApiBaseService<IPersonDataModel> {
  protected readonly endpoint = UrlConstants.aboutMe;
}
