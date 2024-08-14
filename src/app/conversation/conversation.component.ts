import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../services/media-query.service';
import { ActivatedRoute, Router } from '@angular/router';
import { io } from 'socket.io-client';
import { ConversationService } from '../services/conversation.service';
import { SocketIoService } from '../services/socket-io.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  conversationInfo: any = []
  messages: any[] = []
  userId: string = ''
  content: string = ''
  toggle: boolean = false
  toggleMessage: boolean = false
  isSelected: boolean = false
  toggleDropMenu() {
    this.toggle = !this.toggle
  }

  toggleDropMenuMessage() {
    this.toggleMessage = !this.toggleMessage
  }

  returnBack() {
    this._MediaQueryService.handelMedia.next(false)
    this._Router.navigate(['./messages'])
  }

  constructor(private _MediaQueryService: MediaQueryService, private _Router: Router, private _ConversationService: ConversationService, private _ActivatedRoute: ActivatedRoute, private _SocketIoService: SocketIoService) { }

  ngOnInit(): void {
    this.getConverstaionInfo()
    this._SocketIoService.onEvent('onlineUsers').subscribe(() => {
      this.conversationInfo.status = 'online'
    })

    this._SocketIoService.onEvent('offlineUsers').subscribe(() => {
      this.conversationInfo.status = 'offline'
    })

    this._SocketIoService.onEvent('receiveMessage').subscribe((data) => {
      console.log(data);

    })
  };

  getConverstaionInfo() {
    const { id } = this._ActivatedRoute.snapshot.params
    this._ConversationService.getConverstaionInfo(id).subscribe({
      next: (res) => {
        this.userId = res.result.userId
        this.conversationInfo = res.result.receiverId
        this.messages = res.result.messages
      }
    })
  }

  sendMessage(): void {
    if (this.content.trim()) {
      this._ConversationService.sendMessage({ recipientId: this.conversationInfo._id, content: this.content }).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'Done') {
            this.content = ''
          }
        }
      })
    }
  }

}
