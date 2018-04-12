import { Component, OnInit } from '@angular/core';
import {SocketService} from "../services/socket.service";
import {NavigationExtras, Router} from "@angular/router";
import {CreateRoomService} from "../services/createRoom.service";
import {Partie} from "../model/Partie";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuOpen: boolean;
  nomVillage: string;
  pinVillage: string;

  partie: Partie;


  constructor(private router: Router,
              private socketService: SocketService) {
    this.menuOpen = false;

    this.partie = { nbJoueurs : 10, roles : ['sorcière','chasseur'], pin: 99999};
  }

  ngOnInit() {
    this.socketService
      .getMessagesCreerPartie()
      .subscribe((data) => {
        this.redirectToRoom(data);
      });

  }

  clickMenu() {
    this.menuOpen = !this.menuOpen;
  }

  createVillage() {
    this.socketService.sendMessageCreerPartie(this.partie)
  }

  joinVillage(){
    console.log('Connexion à la room ' + this.pinVillage);
  }

  redirectToRoom(data: any){
    const partie = data.partie;
    let navigationExtras: NavigationExtras = {
    queryParams: {
        "pin": data.partie.pin
      }
    };
    this.router.navigate(['room'], navigationExtras);
  }
}
