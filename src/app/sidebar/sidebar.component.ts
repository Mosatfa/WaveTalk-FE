import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../services/media-query.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  toggleDropmenu: boolean = false
  hideSideBar :boolean = false
  profileToggle() {
    this.toggleDropmenu = !this.toggleDropmenu
  }
  
  constructor(private _MediaQueryService:MediaQueryService) { }

  ngOnInit(): void {
    this._MediaQueryService.handelMedia.subscribe({
      next: () => {
        this.hideSideBar = this._MediaQueryService.handelMedia.getValue()
      }
    })
  }

}
