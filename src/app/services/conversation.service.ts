import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  baseUrl: string = 'http://localhost:5000/conve/'
  constructor(private _HttpClient: HttpClient) { }

  getConverstaionInfo(receiverId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${receiverId}`)
  }

  sendMessage(formDara:object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}sendMessage`,formDara)
  }
}
