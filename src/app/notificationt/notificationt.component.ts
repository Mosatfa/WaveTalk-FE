import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../services/socket-io.service';
import { ContactsService } from '../services/contacts.service';
import { MediaQueryService } from '../services/media-query.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notificationt',
  templateUrl: './notificationt.component.html',
  styleUrls: ['./notificationt.component.scss']
})
export class NotificationtComponent implements OnInit {
  notifications: any[] = []
  unreadCount: number = 0;

  constructor(private _SocketIoService: SocketIoService, private _ContactsService: ContactsService, private _MediaQueryService: MediaQueryService, private _Router: Router, private _NotificationService: NotificationService) { }

  returnBack() {
    this._MediaQueryService.handelMedia.next(false)
    this._Router.navigate(['./messages'])
  }

  async ngOnInit() {
    // Get Notification runTime
    this._SocketIoService.onEvent('newNotification').subscribe((data: Object) => {
      this.notifications.push(data);
      this._NotificationService.notificationsMark.next(true)
    })
    this.getNotifications()
  }

  // async addNotification(data: Object): Promise<void> {
  //   return new Promise((resolve) => {
  //     this.notifications.push(data);
  //     resolve(); // Resolve the promise after the data is pushed
  //   });
  // }
  // async onNewNotification(data: Object): Promise<void> {
  //   await this.addNotification(data); // Wait for the notification to be added
  //   this._NotificationService.updateDataArray(this.notifications); // Now update the data array
  //   this._NotificationService.notificationsMark.next(true); // Notify that the notifications were marked
  // }

  getNotifications() {
    this._ContactsService.getNotification().subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.notifications = res.result
        }
      }
    })
  }

  confirmRequest(id: string) {
    this._ContactsService.acceptFriend(id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.notifications = this.notifications.filter(ele => ele.friendId != id)
        }
      }
    })

  }

  cancelRequest(id: string) {
    this._ContactsService.cancelFriend(id).subscribe({
      next: (res) => {
        if (res.message == 'Done') {
          this.notifications = this.notifications.filter(ele => ele.friendId != id)
        }
      }
    })
  }

}
