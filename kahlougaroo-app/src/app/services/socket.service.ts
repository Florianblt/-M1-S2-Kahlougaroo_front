import {Injectable, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import {Partie} from "../model/Partie";
import {Player} from "../model/Player";
import {Roles} from "../model/Roles";

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

  /**
   * Demande à rejoindre une partie avec le pin contenu dans data
   * Le joueur aura pour pseudo celui contenu dans data
   * @param data
   */
  public joinPartie(data: any){
    this.socket.emit('join', data);
  }

  /**
   * Quitte la partie
   */
  public leaveGame(token: string, pseudo: string){
    this.socket.emit('quitter_room', {token: token, pseudo: pseudo});
  }

  /**
   * Exclu un joueur de la partie
   * @param {number} pin
   * @param {Player} player
   */
  public kickPlayer(pin: number, player: string){
    this.socket.emit('exclure_room', { pin: pin, pseudo: player });
  }

  public startPartie(pin: number, nbJoueurs: number, roles: Roles){
    this.socket.emit('start_game', {
      pin:pin,
      nbJoueurs:nbJoueurs,
      roles:roles
    });
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

  /**
   * Confirme l'acces à la partie et recupere son instance de joueur
   * @returns {any}
   */
  public getMyPlayerInstance = () => {
    return Observable.create((observer) => {
      this.socket.on('confirmation_join', (message) => {
        observer.next(message);
      })
    })
  }

  /**
   * Notifie l'entrée d'un joueur dans le salon
   * @returns {any}
   */
  public playerJoinTheRoom = () => {
    return Observable.create((observer) => {
      this.socket.on('joueur_join_partie', (message) => {
        observer.next(message);
      })
    })
  }

  /**
   * Notifie que le salon n'existe pas
   * @returns {any}
   */
  public cantJoinTheRoom = () => {
    return Observable.create((observer) => {
      this.socket.on('erreur_no_partie', (message) => {
        observer.next(message);
      })
    })
  }

  /**
   * Notifie que le joueur est expulsé de la partie
   * @returns {any}
   */
  public beKicked = () => {
    return Observable.create((observer) => {
      this.socket.on('you_kick', (message) => {
        observer.next(message);
      })
    })
  }

  /**
   * Récupère le role du joueur au lancement de la partie
   * @returns {any}
   */
  public getRole = () => {
    return Observable.create((observer) => {
      this.socket.on('role', (message) => {
        observer.next(message);
      });
    });
  }

  /**
   * Notifie toute une room qu'un joueur est parti
   * @returns {any}
   */
  public joueurQuittePartie = () => {
    return Observable.create((observer) => {
      this.socket.on('joueur_quitte_partie', (message) => {
        observer.next(message);
      });
    });
  }
}
