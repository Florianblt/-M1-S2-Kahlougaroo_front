import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "../services/local-storage.service";
import {SocketService} from "../services/socket.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  role: string;

  constructor(private router: Router,
              private socketService: SocketService,
              private localStorageService: LocalStorageService) {
    this.role = this.localStorageService.getRole();
    console.log(this.role);

  }

  ngOnInit() {
  }

}
