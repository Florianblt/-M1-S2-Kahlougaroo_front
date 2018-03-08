import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuOpen: boolean;
  nomVillage: string;
  pinVillage: string;

  constructor() {
    this.menuOpen = false;
  }

  ngOnInit() {
  }

  clickMenu() {
    console.log("click");
    this.menuOpen = !this.menuOpen;
  }

  createVillage() {
    alert('Création de la room ...');
  }

  joinVillage(){
    alert('Connexion à la room ' + this.pinVillage);
  }
}
