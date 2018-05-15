import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RoomComponent} from "./room/room.component";
import {LobbyComponent} from "./lobby/lobby.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'room', component: RoomComponent},
  { path: 'lobby', component: LobbyComponent},
  { path: 'game', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
