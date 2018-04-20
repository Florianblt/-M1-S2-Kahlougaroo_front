import {Component, OnInit } from '@angular/core';
import {SocketService} from "../services/socket.service";
import {Router} from "@angular/router";
import {Partie} from "../model/Partie";
import {LocalStorageService} from "../services/local-storage.service";
import {Player} from "../model/Player";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // bool de gestion menu
  menuOpen: boolean;

  // pin du village à rejoindre
  pinVillage: string;

  //pseudo choisi par le joueur
  pseudo: string;

  // partie qui sera créée
  partie: Partie;

  // joueur courant
  currentPlayer: Player;


  constructor(private router: Router,
              private socketService: SocketService,
              private localStorageService: LocalStorageService,
              public snackBar: MatSnackBar) {

    // init position menu
    this.menuOpen = false;

    // mock partie pour création
    this.partie = { nbJoueurs : 6, pin: null, statut: null};
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

    this.socketService
      .getMyPlayerInstance()
      .subscribe((data) => {
        console.log("reception join " + data);
        this.currentPlayer = data;
        this.localStorageService.saveUser(this.currentPlayer.token);
        this.redirectToLobby();
      });

    this.socketService
      .cantJoinTheRoom()
      .subscribe((data) => {
        console.log("pas de game " + data);
        this.openSnackBar();
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
    const data = {pin: this.pinVillage, pseudo: this.pseudo};
    this.socketService.joinPartie(data);
  }

  /**
   * Redirige vers la vue room
   */
  redirectToRoom(){
    this.router.navigate(['room']);
  }

  /**
   * Redirige vers la vue lobby
   */
  redirectToLobby(){
    this.router.navigate(['lobby']);
  }

  /**
   * SnackBar
   */
  openSnackBar() {
    this.snackBar.open('Pin incorrect','#' + this.pinVillage, {duration: 1500, panelClass: 'testSnack'});
  }
}
