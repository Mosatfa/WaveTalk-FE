import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
   baseUrl: string = 'http://localhost:5000/friend/'
  constructor(private _HttpClient:HttpClient) { }
  getNotification():Observable<any>{  
    return this._HttpClient.get(`${this.baseUrl}notification`)
  }
  getFriends():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}`)
  }
  addFriend(userName:String):Observable<any>{  
    return this._HttpClient.patch(`${this.baseUrl}add`,{friendName:userName})
  }
  acceptFriend(friendId:String):Observable<any>{  
    return this._HttpClient.patch(`${this.baseUrl}accept`,{friendId})
  }
  cancelFriend(friendId:String):Observable<any>{  
    return this._HttpClient.patch(`${this.baseUrl}cancel`,{friendId})
  }
}

