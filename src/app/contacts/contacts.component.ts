import { Component, OnInit } from '@angular/core';
import { MediaQueryService } from '../services/media-query.service';
import { Router } from '@angular/router';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  sendRequest: String = ''
  showNotification: boolean = false
  messageError: string = ''
  
  returnBack() {
    this._MediaQueryService.handelMedia.next(false)
    this._Router.navigate(['./messages'])
  }
  constructor(private _MediaQueryService: MediaQueryService, private _Router: Router, private _ContactsService: ContactsService) { }

  ngOnInit(): void {
  }

  sendAddRequest() {
    if (this.sendRequest.trim()) {
      this._ContactsService.addFriend(this.sendRequest).subscribe({
        next: (res) => {
          if (res.message == 'Done') {
            this.showNotification = true
            this.sendRequest = ''
            setTimeout(() => {
              this.showNotification = false
            }, 4500)
          }
        },
        error: (err) => {
          this.messageError = err.error.message
        }
      })
    }
  }


}
