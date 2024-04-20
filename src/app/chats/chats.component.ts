import { Component, HostListener, OnInit } from '@angular/core';
import { MediaQueryService } from '../media-query.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  isSelected: boolean = false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth > 767) {
      this.isSelected = false
    }
  }
  
  constructor(private _MediaQueryService: MediaQueryService) { }

  ngOnInit(): void {
    this._MediaQueryService.handelMedia.subscribe({
      next: () => {
        this.isSelected = this._MediaQueryService.handelMedia.getValue()
      }
    })
  }
}
