import { Injectable } from '@angular/core';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { IHobbiesDataModel } from 'src/app/shared-module/interfaces/i-hobbies';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService extends ApiBaseService<IHobbiesDataModel[]> {
  protected readonly endpoint = UrlConstants.hobbies;
}
