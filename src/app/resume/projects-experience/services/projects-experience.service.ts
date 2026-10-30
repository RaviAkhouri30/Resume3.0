import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IProjectsExperienceDataModel } from 'src/app/shared-module/interfaces/i-projects-experience-data-model';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsExperienceService extends ApiBaseService<IProjectsExperienceDataModel[]> {
  protected readonly endpoint = UrlConstants.projectsExperience;
}
