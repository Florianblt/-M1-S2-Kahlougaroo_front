import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Roles} from "../../model/Roles";

@Component({
  selector: 'app-games-params-dialog',
  templateUrl: './games-params-dialog.component.html',
  styleUrls: ['./games-params-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GamesParamsDialogComponent implements OnInit {

  public roles: Roles;

  constructor(private dialogRef: MatDialogRef<GamesParamsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.roles = data;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
