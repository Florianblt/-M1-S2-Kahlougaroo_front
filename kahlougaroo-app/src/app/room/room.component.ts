import {Component, OnInit} from '@angular/core';
import {Player} from "../model/Player";
import {ActivatedRoute} from "@angular/router";
import {Partie} from "../model/Partie";
import {SocketService} from "../services/socket.service";
import {LocalStorageService} from "../services/local-storage.service";

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

  partie: Partie;

  // @Input
  currentUser: Player;

  constructor(private route: ActivatedRoute,
              private socketService: SocketService,
              private localStorageService: LocalStorageService) {
    this.token = this.localStorageService.getUser();
    this.socketService.getPartieByToken(this.token);
  }

  ngOnInit() {
    this.village = 'PadanladoK';
    this.currentUser = {pseudo:'Pierre', token:"token", master:true, role:null, vivant:true};
    this.players = [];

    // récupère les information de la partie
    this.socketService
      .getPartieByTokenResponse()
      .subscribe((data) => {
        console.log("partie receptionnée : " + data.pin);
        this.partie = data;
        console.log("partie créée : " + this.partie);
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
    }
  }

  /**
   * Lance la partie
   */
  startStory() {
    console.log("On démarre l'histoire")
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

}
