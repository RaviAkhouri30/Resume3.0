import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { Context } from 'src/app/shared-module/enums/context';
import { BaseService } from 'src/app/shared-module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService extends BaseService {

  // Constructor to initialize the base service with the context
  constructor() {
    super(Context.AboutMe);
  }

  // Override method to attach view API handler
  override attachViewDataHandler<T>(): Observable<T> {
    return this.attachViewApiHandler(UrlConstants.aboutMe);
  }

}
