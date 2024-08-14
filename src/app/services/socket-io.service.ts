import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  handelNotfic:any = new BehaviorSubject(false)
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:5000')    
  }

  // Method to listen to an event
  onEvent(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  // Method to emit an event
  emitEvent(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  // Method to disconnect the socket
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
