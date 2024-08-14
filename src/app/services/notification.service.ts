import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketIoService } from './socket-io.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private dataArraySubject = new BehaviorSubject<any[]>([]);
  notificationsMark: any = new BehaviorSubject(false)


  constructor(private _SocketIoService:SocketIoService) { }
  // Observable for components to subscribe to
  dataArray$ = this.dataArraySubject.asObservable();

  // Method to update the array
  updateDataArray(newArray: any[]) {
    this.dataArraySubject.next(newArray);
  }

  // Method to get the current value of the array
  getCurrentArray() {
    return this.dataArraySubject.getValue();
  }




  // this._NotificationService.dataArray$.subscribe((array) => {
  // });


}
