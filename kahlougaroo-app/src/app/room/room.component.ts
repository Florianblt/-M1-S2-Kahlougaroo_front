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
  pin: string;
  players: Player[];
  token: string;
  menuOpened: boolean;
  events = [];
  roles: Roles;

  partie: Partie;

  // @Input
  currentUser: Player;

  constructor(private route: ActivatedRoute,
              private socketService: SocketService,
              private socketService2: SocketService,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog) {
    this.token = this.localStorageService.getUser();
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
    this.socketService2
      .playerJoinTheRoom()
      .subscribe((data) => {
        this.players.push({pseudo: data, token: null, master:false, role:null, vivant:true})
      });
  }

  /**
   * Exclus un joueur de la partie
   * @param {Player} player
   */
  kickPlayer(player: Player) {
    const index: number = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
      this.socketService.kickPlayer(this.partie.pin, player)
    }
  }

  /**
   * Lance la partie
   */
  startStory() {
    console.log("On démarre l'histoire")
    let roles = this.roles;
    let nbJoueurs = 6;
    this.socketService.startPartie(this.partie.pin, nbJoueurs, roles);
  }

  /**
   * Supprime la partie
   */
  deleteRoom() {
    console.log("suppression de la room");
  }

  /**
   * Quitte la partie
   */
  leaveRoom() {
    // console.log(current user + "quitte la room");
  }

  openDialog() {
    let dialogRef = this.dialog.open(GamesParamsDialogComponent, {
      width: '80%', //height: '70vh',
      data: this.roles
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      console.log('close with : ... ');
      console.log(this.roles);
    });
  }

}
