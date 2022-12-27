import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseModel } from 'src/app/shared-module/models/response-model';
import { EduAwardAcheivementModel } from '../model/edu-award-acheivement-model';
import { AWARDS_ACHEIVEMENTS } from './awards-acheivements';
import { EDU_ACHEIVEMENT_AWARDS } from './edu-acheivement';

@Injectable({
  providedIn: 'root'
})
export class EduAwardAcheivementService {

  constructor() { }

  public getEducationAndAcheivementData = (): Observable<ResponseModel<EduAwardAcheivementModel[]>> => {
    const data: EduAwardAcheivementModel[] = EDU_ACHEIVEMENT_AWARDS.map((e: any) => new EduAwardAcheivementModel(JSON.parse(JSON.stringify(e))));
    const res: ResponseModel<EduAwardAcheivementModel[]> = new ResponseModel<EduAwardAcheivementModel[]>(data);
    return of(res);
  }

  public getAwardsAndAchievement = (): Observable<ResponseModel<string[]>> => {
    const data: string[] = [...AWARDS_ACHEIVEMENTS];
    const res: ResponseModel<string[]> = new ResponseModel<string[]>(data);
    return of(res);
  }

}
