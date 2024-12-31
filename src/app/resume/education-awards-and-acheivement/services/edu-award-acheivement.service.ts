import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { EduAwardAcheivementModel } from '../model/edu-award-acheivement-model';

@Injectable({
  providedIn: 'root'
})
export class EduAwardAcheivementService {

  constructor() { }

  // public getEducationAndAcheivementData = (): Observable<any<EduAwardAcheivementModel[]>> => {
    // const data: EduAwardAcheivementModel[] = EDU_ACHEIVEMENT_AWARDS.map((e: any) => new EduAwardAcheivementModel(JSON.parse(JSON.stringify(e))));
    // const res: ResponseModel<EduAwardAcheivementModel[]> = new ResponseModel<EduAwardAcheivementModel[]>(data);
    // return of();
  // }

  // public getAwardsAndAchievement = (): Observable<ResponseModel<string[]>> => {
    // const data: string[] = [...AWARDS_ACHEIVEMENTS];
    // const res: ResponseModel<string[]> = new ResponseModel<string[]>(data);
  //   return of();
  // }

}
