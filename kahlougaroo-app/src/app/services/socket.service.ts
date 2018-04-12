import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {Partie} from "../model/Partie";

@Injectable()
export class SocketService {

  private url = 'http://localhost:3000';
  private socket;
  // private partie: Partie;

  constructor(private router: Router) {
    this.socket = io.connect(this.url);
  }

  public sendMessageCreerPartie(partie: Partie): any{
    //Création partie
    this.socket.emit('creation_de_partie', partie);

    // //Attente de réponse serveur
    // this.socket.on('confirmation_de_creation', function (data) {
    //   console.log('Socket.io : On "confirmation_de_creation"');
    // });
  }

  public getMessagesCreerPartie = () => {
    return Observable.create((observer) => {
      this.socket.on('confirmation_de_creation', (message) => {
        observer.next(message);
      });
    });
  }
}
