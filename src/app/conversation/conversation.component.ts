import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../media-query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  toggle: boolean = false
  toggleMessage = false
  isSelected = false
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



  constructor(private _MediaQueryService: MediaQueryService , private _Router:Router) { }

  ngOnInit(): void {
  }

}
