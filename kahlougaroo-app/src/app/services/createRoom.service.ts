import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class CreateRoomService {

  messages: Subject<any>;

  // // Our constructor calls our wsService connect method
  // constructor(private wsService: SocketService) {
  //   this.messages = <Subject<any>>wsService
  //     .connect()
  //     .map((response: any): any => {
  //       return response;
  //     })
  // }
  //
  // // Our simplified interface for sending
  // // messages back to our socket.io server
  // createPartie(msg, partie) {
  //   this.messages.next(msg);
  // }

}
