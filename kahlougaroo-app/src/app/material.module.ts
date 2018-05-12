import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSnackBarModule, MatSidenavModule, MatCheckboxModule, MatDialogModule, MatSliderModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSliderModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSliderModule,
  ],
})
export class MaterialModule { }
