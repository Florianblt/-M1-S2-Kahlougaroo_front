import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {Partie} from "../model/Partie";

@Injectable()
export class SocketService {

  // URL serveur socket.io
  private url = 'http://localhost:3000';
  private socket;

  constructor(private router: Router) {
    // connexion au serveur socket.io
    this.socket = io.connect(this.url);
  }

  //EMITERS

  /**
   * Création de partie
   * @param {Partie} partie
   */
  public sendMessageCreerPartie(partie: Partie) {
    this.socket.emit('creation_de_partie', partie);
  }

  /**
   * Demande de récupération de partie pour un joueur
   * @param {string} token
   */
  public getPartieByToken(token: string) {
    this.socket.emit('get_partie_by_token', token);
  }



  //GETERS

  /**
   * Confirme la création de la partie et récupère le token du maitre du jeu
   * @returns {any}
   */
  public getMessagesCreerPartie = () => {
    return Observable.create((observer) => {
      this.socket.on('confirmation_creation', (message) => {
        observer.next(message);
      });
    });
  }

  /**
   * Récupère une Partie
   * @returns {any}
   */
  public getPartieByTokenResponse = ()  => {
    return Observable.create((observer) => {
      this.socket.on('envoi_partie', (message) => {
        observer.next(message);
      })
    })
  }
}
