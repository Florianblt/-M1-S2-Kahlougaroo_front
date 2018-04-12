import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {HomeComponent} from "./home/home.component";
import {RoomComponent} from "./room/room.component";
import {SocketService} from "./services/socket.service";
import {CreateRoomService} from "./services/createRoom.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    SocketService,
    CreateRoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
