import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { ResponseModel } from 'src/app/shared-module/models/response-model';
// import { HEAD_DATA } from '../model/head-data';
// import { HeadSectionModel } from '../model/head-section-model';

@Injectable({
  providedIn: 'root'
})
export class HeadSectionService {

  constructor() { }

  // public getHeadData = (): Observable<ResponseModel<HeadSectionModel>> => {
  //   const data: HeadSectionModel = new HeadSectionModel();
  //   data.setDesignation(HEAD_DATA.designation);
  //   data.setRole(HEAD_DATA.role);
  //   data.setUserName(HEAD_DATA.userName);
  //   const res: ResponseModel<HeadSectionModel> = new ResponseModel(data);
  //   return of(res);
  // }

}
