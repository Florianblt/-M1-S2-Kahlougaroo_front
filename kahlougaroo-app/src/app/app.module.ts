import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HomeComponent} from "./home/home.component";
import {RoomComponent} from "./room/room.component";
import {SocketService} from "./services/socket.service";
import { LocalStorageModule } from '@ngx-pwa/local-storage';
import {LocalStorageService} from "./services/local-storage.service";
import {FormsModule} from "@angular/forms";
import {LobbyComponent} from "./lobby/lobby.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LocalStorageModule,
    FormsModule,
  ],
  providers: [
    SocketService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
