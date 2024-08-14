import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketIoService } from './services/socket-io.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'WaveTalk';
  notifications: any[] = []

  constructor(private _SocketIoService: SocketIoService, private _NotificationService:NotificationService) { }

  ngOnInit(): void {
    this.initializeSocketConnection();
  }

  initializeSocketConnection(): void {

    this._SocketIoService.onEvent('connect').subscribe(() => {
      console.log('Connected to server');
      this._SocketIoService.emitEvent('updateSocketId', { token: localStorage.getItem('user_token') })
      // fetch Unread Notifications
      this._SocketIoService.emitEvent('fetchUnreadNotifications');
      //Get Notification Unread
      this._SocketIoService.onEvent('unreadNotifications').subscribe((data: Object[]) => {
        this.notifications = data;        
        if (data.length) {
          this._NotificationService.notificationsMark.next(true)
        }
      })
    })

    this._SocketIoService.onEvent('disconnect').subscribe(() => {
      console.log('Disconnected from server');
    })

    // Listening to events from server
    this._SocketIoService.onEvent('authSocket').subscribe((data: string) => {
      console.log('Message from server:', data);
      // Handle incoming messages from the server
    })

  }

  ngOnDestroy(): void {
    this._SocketIoService.disconnect()
  }
}
