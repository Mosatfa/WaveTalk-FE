import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {
  handelMedia:any = new BehaviorSubject(false)

  constructor() {}
}
