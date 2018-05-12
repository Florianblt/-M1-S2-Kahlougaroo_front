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
      .beKicked()
      .subscribe((data) => {
        this.beKicked();
      });

    //déclenché lors de l'attribution des roles
    this.socketService
      .getRole()
      .subscribe((data) => {
        console.log('Role : ' + data);
      });
  }

  /**
   * Quitter la partie
   * se desinscrit aupres de socket et clean le local storage
   */
  leave() {
    this.socketService.leaveGame();
    this.localStorageService.cleanLocalStoage();
    this.router.navigate(['']);
  }

  /**
   * Exclusion de la partie
   * Informe de l'exclusion et clean le local storage
   */
  beKicked() {
    alert('Vous avez été exclu de la partie');
    this.localStorageService.cleanLocalStoage();
    this.router.navigate(['']);
  }

}
