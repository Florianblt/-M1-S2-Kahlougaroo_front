import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class LocalStorageService {

  constructor(private router: Router) {
  }

  /**
   * Nettoie le stockage local en supprimant tout les elements qui s'y trouve
   */
  public cleanLocalStoage(){
    window.localStorage.clear();
  }

  /**
   * Sauvegarde le token utilisateur dans le stockage local
   * @param {string} token
   */
  public saveUser(token: string) {
    window.localStorage.setItem('token', token);
  }

  /**
   * Renvoie l'utilisateur stocké en local
   * @returns {any}
   */
  public getUser(): any {
    return window.localStorage.getItem('token');
  }

  /**
   * Supprime le token utilisateur du stockage local
   */
  public removeUser(){
    window.localStorage.removeItem('token');
  }
}
