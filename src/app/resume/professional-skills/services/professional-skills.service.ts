import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IProfessionalSkillsDataModel } from 'src/app/shared-module/interfaces/i-professional-skills';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalSkillsService extends ApiBaseService<IProfessionalSkillsDataModel[]> {
  protected readonly endpoint = UrlConstants.skills;
}
