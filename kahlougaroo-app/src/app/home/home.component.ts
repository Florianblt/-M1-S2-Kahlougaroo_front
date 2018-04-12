import { Component, OnInit } from '@angular/core';
import {SocketService} from "../services/socket.service";
import {NavigationExtras, Router} from "@angular/router";
import {Partie} from "../model/Partie";
import {LocalStorageService} from "../services/local-storage.service";
import {Player} from "../model/Player";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // bool de gestion menu
  menuOpen: boolean;

  // nom de la partie
  nomVillage: string;

  // pin du village à rejoindre
  pinVillage: string;

  // partie qui sera créée
  partie: Partie;

  // joueur courant
  currentPlayer: Player;


  constructor(private router: Router,
              private socketService: SocketService,
              private localStorageService: LocalStorageService) {

    // init position menu
    this.menuOpen = false;

    // mock partie pour création
    this.partie = { nbJoueurs : 10, roles : ['sorcière','chasseur'], pin: 99999};
  }

  ngOnInit() {

    // lance la redirection lors d'une création de partie
    this.socketService
      .getMessagesCreerPartie()
      .subscribe((data) => {
        this.currentPlayer = data;
        this.localStorageService.saveUser(this.currentPlayer.token);
        this.redirectToRoom();
      });
  }

  /**
   * Switch entre les menus de connexion et de création de partie
   */
  clickMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Création d'un nouvelle partie
   */
  createVillage() {
    this.socketService.sendMessageCreerPartie(this.partie)
  }

  /**
   * Rejoindre une partie existante
   */
  joinVillage(){
    console.log('Connexion à la room ' + this.pinVillage);
  }

  /**
   * Redirige vers la vue room
   * @param data
   */
  redirectToRoom(){
    this.router.navigate(['room']);
  }
}
