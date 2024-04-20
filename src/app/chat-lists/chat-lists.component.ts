import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../media-query.service';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styleUrls: ['./chat-lists.component.scss']
})
export class ChatListsComponent implements OnInit {
  toggle: boolean = false
  toggleNotificationt: boolean = false


  btnNotificationt(){
    this.toggleNotificationt = !this.toggleNotificationt

  }
  toggleSearch() {
    this.toggle = !this.toggle
  }


  selectedChat(){
    let selected = window.innerWidth < 768 ? true : false
    this._MediaQueryService.handelMedia.next(selected)
  }

  constructor(private _MediaQueryService:MediaQueryService) { }

  ngOnInit(): void {
  }

}
