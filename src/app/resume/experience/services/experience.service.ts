import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Context } from 'src/app/shared-module/enums/context';
import { BaseService } from 'src/app/shared-module/services/base.service';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends BaseService {

  // Constructor to initialize the base service with the context
  constructor() {
    super(Context.Experience);
  }

  // Override method to attach view API handler
  override attachViewDataHandler<T>(): Observable<T> {
    return this.attachViewApiHandler(UrlConstants.experience);
  }

}
