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
   * Retourne l'utilisateur stocké en local
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

  /**
   * Sauvegarde le role du joueur dans le local storage
   * @param {string} role
   */
  public saveRole( role: string){
    window.localStorage.setItem('role', role);
  }

  /**
   * Retourne le role stocké du stockage local
   * @returns {any}
   */
  public getRole(): any {
    return window.localStorage.getItem('role');
  }

  /**
   * Supprime le role du stockage local
   */
  public removeRole(){
    window.localStorage.removeItem('role');
  }
}
