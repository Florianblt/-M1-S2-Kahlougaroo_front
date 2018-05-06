import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "../services/socket.service";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private router: Router,
              private socketService: SocketService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    // declenché lorsque l'ont est exclu de la partie
    this.socketService
      .getPartieByTokenResponse()
      .subscribe((data) => {
        this.beKicked();
      });
  }

  leave() {
    this.socketService.leaveGame();
    this.localStorageService.cleanLocalStoage();
    this.router.navigate(['']);
  }

  beKicked() {
    alert("Vous etes viré");
  }

}
