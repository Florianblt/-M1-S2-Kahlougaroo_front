import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../model/Player";
import {ActivatedRoute} from "@angular/router";
import {Partie} from "../model/Partie";

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  village: string;
  pin: string;
  players: Player[];

  joueurMaster : any;
  partie : String[];
  // @Input
  currentUser: Player;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.pin = params["pin"];
    });
    console.log(this.partie);
    console.log(this.joueurMaster);
  }

  ngOnInit() {
    this.village = 'PoopiLand';
    this.currentUser = {name:'Pierre', token:"token", admin:true};
    this.players = [];
  }

  kickPlayer(player: Player) {
    const index: number = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  startStory() {
    console.log("On démarre l'histoire")
  }

  deleteRoom() {
    console.log("suppression de la room");
  }

  leaveRoom() {
    // console.log(current user + "quitte la room");
  }

}
