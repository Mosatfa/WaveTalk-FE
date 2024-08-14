import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../services/media-query.service';
import { io } from 'socket.io-client';
import { SocketIoService } from '../services/socket-io.service';
import { NotificationService } from '../services/notification.service';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styleUrls: ['./chat-lists.component.scss']
})
export class ChatListsComponent implements OnInit {
  toggle: boolean = false
  notification: boolean = false
  friendsList: any[] = []
  status: string = 'offline'
  toggleSearch() {
    this.toggle = !this.toggle
  }

  readNotifications() {
    this.notification = false
    this._NotificationService.notificationsMark.next(false)
    this._SocketIoService.emitEvent('markAsRead')
  }

  selected() {
    let selected = window.innerWidth < 768 ? true : false
    this._MediaQueryService.handelMedia.next(selected)
  }

  constructor(private _MediaQueryService: MediaQueryService, private _SocketIoService: SocketIoService, private _NotificationService: NotificationService, private _ContactsService: ContactsService) { }

  ngOnInit(): void {
    //Aleart Notidications active
    this._NotificationService.notificationsMark.subscribe({
      next: () => {
        this.notification = this._NotificationService.notificationsMark.getValue()
      }
    })

    // get conversation List
    this.getFriendsLsit()

    
    this._SocketIoService.onEvent('onlineUsers').subscribe((data) => {
      this.updateStatus(data._id, 'online')
    })

    this._SocketIoService.onEvent('offlineUsers').subscribe((data: string) => {
      this.updateStatus(data, 'offline')
    })

  }

  getFriendsLsit() {
    this._ContactsService.getFriends().subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.friendsList = res.result.friends
        }
      }
    })
  }

  updateStatus(id: string, newStatus: string): void {
    const item = this.friendsList.find(ele => ele._id === id);
    if (item) {
      item.status = newStatus;
    }
  }

}
