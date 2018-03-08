import { NgModule } from '@angular/core';
import {MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
})
export class MaterialModule { }
