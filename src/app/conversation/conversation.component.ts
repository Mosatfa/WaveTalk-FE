import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MediaQueryService } from '../services/media-query.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '../services/conversation.service';
import { SocketIoService } from '../services/socket-io.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit  , AfterViewChecked{
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.error('Scroll to bottom failed', err);
    }    
  }

  insertEmoji(event: any) {
    this.content += event.native || event.emoji.native;
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
      this.messages.push(data)
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
          if (res.message == 'Done') {
            this.scrollToBottom();
            this.content = ''
          }
        }
      })
    }
  }

}
