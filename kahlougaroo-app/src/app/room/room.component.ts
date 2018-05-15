import {Component, OnInit} from '@angular/core';
import {Player} from "../model/Player";
import {Roles} from "../model/Roles";
import {ActivatedRoute} from "@angular/router";
import {Partie} from "../model/Partie";
import {SocketService} from "../services/socket.service";
import {LocalStorageService} from "../services/local-storage.service";
import {MatDialog} from "@angular/material";
import {GamesParamsDialogComponent} from "./games-params-dialog/games-params-dialog.component";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  village: string;
  players: string[];
  token: string;
  menuOpened: boolean;
  roles: Roles;

  partie: Partie;

  // @Input
  currentUser: Player;

  constructor(private route: ActivatedRoute,
              private socketService: SocketService,
              private socketService2: SocketService,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog) {
    this.token = this.localStorageService.getToken();
    this.socketService.getPartieByToken(this.token);
    this.menuOpened = false;
    this.roles = {nbLoups: 2, chasseur: true, cupidon: true, petiteFille: true, sorciere: true, voyante: true};
  }

  ngOnInit() {
    this.village = 'Thiercelieux';
    this.currentUser = {pseudo:'Pierre', token:"token", master:true, role:null, vivant:true};
    this.players = [];

    // récupère les information de la partie
    this.socketService
      .getPartieByTokenResponse()
      .subscribe((data) => {
        this.partie = data;
      });

    // ecoute l'entrée de joueurs dans la room
    this.socketService
      .playerJoinTheRoom()
      .subscribe((data) => {
        this.players.push(data);
      });

    this.socketService
      .joueurQuittePartie()
      .subscribe((data) => {
        const index: number = this.players.indexOf(data);
        if (index !== -1) {
          this.players.splice(index, 1);
        }
      });
  }

  /**
   * Exclus un joueur de la partie
   * @param {Player} player
   */
  kickPlayer(player: string) {
    const index: number = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
      this.socketService.kickPlayer(this.partie.pin, player);
    }
  }

  /**
   * Envoi un ping à un joueur
   * @param {Player} player
   */
  pingPlayer(player: Player) {

  }

  /**
   * Lance la partie
   */
  startStory() {
    if(this.checkRoles()){
      console.log("On démarre l'histoire")
      let roles = this.roles;
      let nbJoueurs = this.players.length;
      this.socketService.startPartie(this.partie.pin, nbJoueurs, roles);
    } else {
      if(this.players.length <= 2) {
        alert("Trop peu de joueurs ! (3 minimum)");
      } else {
        this.openDialog();
      }
    }
  }

  /**
   * Supprime la partie
   */
  deleteRoom() {
    console.log("suppression de la room");
  }

  /**
   * Annonce la départ d'un joueur
   */
  leaveRoom(pseudo: string) {
    // console.log(current user + "quitte la room");
  }

  /**
   * Ouverture de la modale settings
   */
  openDialog() {
    let dialogRef = this.dialog.open(GamesParamsDialogComponent, {
      width: '80%', //height: '70vh',
      data: this.roles
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  /**
   * Vérifie avant de lancer la partie que les roles paramétrés
   * sont compatibles avec le de joueurs
   */
  private checkRoles() {
    let nbRoles = this.roles.nbLoups;
    const nbJoueurs = this.players.length
    if(this.roles.cupidon) {
      nbRoles += 1;
    }
    if(this.roles.petiteFille) {
      nbRoles += 1;
    }
    if(this.roles.chasseur) {
      nbRoles += 1;
    }
    if(this.roles.sorciere) {
      nbRoles += 1;
    }
    if(this.roles.voyante) {
      nbRoles += 1;
    }
    if(nbJoueurs <= 2){
      return false;
    } else if(nbRoles > nbJoueurs) {
      alert('Lancement impossible ! Plus de rôles que de joueurs !');
      return false;
    } else if(this.roles.nbLoups / nbJoueurs > 0.4) {
      alert('Lancement impossible ! Trop de loups pour le nombre de joueurs');
    } else {
      return true;
    }
  }

}
