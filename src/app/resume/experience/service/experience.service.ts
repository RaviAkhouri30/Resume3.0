import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../model/experience-model';
import { workExpData } from './work-exp-data';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor() { }

  public getData = (): Observable<ExperienceModel[]> => {
    let result: ExperienceModel[] = [];
    result = workExpData.map(e => new ExperienceModel(JSON.parse(JSON.stringify(e))));
    return new Observable<ExperienceModel[]>(observer => {
      observer.next(result);
    });
  }
}
