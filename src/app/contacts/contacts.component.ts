import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../media-query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  returnBack() {
    this._MediaQueryService.handelMedia.next(false)
    this._Router.navigate(['./messages'])
  }
  constructor(private _MediaQueryService:MediaQueryService , private  _Router:Router) { }

  ngOnInit(): void {
  }

}
