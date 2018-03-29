import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatTooltipModule,
  MatToolbar, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule
  ],
})
export class MaterialModule { }
