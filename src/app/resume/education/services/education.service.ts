import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IEducationDataModel } from 'src/app/shared-module/interfaces/i-education-data-model';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends ApiBaseService<IEducationDataModel[]> {
  protected readonly endpoint = UrlConstants.education;
}
