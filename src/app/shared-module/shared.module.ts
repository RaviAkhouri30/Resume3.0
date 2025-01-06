import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ClipboardModule
  ],
  exports : [
    ProgressBarComponent,
    MatIconModule,
    ClipboardModule
  ]
})
export class SharedModule { }
