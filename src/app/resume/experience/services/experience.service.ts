import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IExperienceDataModel } from 'src/app/shared-module/interfaces/i-experience-data-model';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends ApiBaseService<IExperienceDataModel[]> {
  protected readonly endpoint = UrlConstants.experience;
}
