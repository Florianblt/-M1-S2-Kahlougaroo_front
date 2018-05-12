import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-games-params-dialog',
  templateUrl: './games-params-dialog.component.html',
  styleUrls: ['./games-params-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GamesParamsDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GamesParamsDialogComponent>) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
