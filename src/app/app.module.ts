import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatsComponent } from './chats/chats.component';
import { AutosizeModule } from 'ngx-autosize';
import { ConversationComponent } from './conversation/conversation.component';
import { ChatListsComponent } from './chat-lists/chat-lists.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { NotificationtComponent } from './notificationt/notificationt.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ChatsComponent,
    ConversationComponent,
    ChatListsComponent,
    ContactsComponent,
    ProfileComponent,
    NotificationtComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutosizeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
