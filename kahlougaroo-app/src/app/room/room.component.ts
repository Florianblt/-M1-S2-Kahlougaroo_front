import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../model/Player";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  village: string;
  pin: string;
  players: Player[];

  // @Input
  currentUser: Player;

  constructor() {  }

  ngOnInit() {
    this.village = 'PoopiLand';
    this.currentUser = {name:'Pierre', token:"token", admin:true};
    this.pin = "938584"
    this.players = [
      {name:'Jannou', token:"token", admin: false},
      {name:'Zlino', token:"token", admin: false},
      {name:'Fabinou', token:"token", admin: false},
      {name:'Fahsol', token:"token", admin: false},
      {name:'Lolo', token:"token", admin: false},
      {name:'Evan', token:"token", admin: false},
      {name:'Ouioui', token:"token", admin: false},
      {name:'Tchoupi', token:"token", admin: false},
    ];
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
