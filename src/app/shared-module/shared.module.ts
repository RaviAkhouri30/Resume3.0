import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ShowMessageDialogComponent } from './components/show-message-dialog/show-message-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProgressBarComponent,
    ShowMessageDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ClipboardModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports : [
    ProgressBarComponent,
    MatIconModule,
    ClipboardModule,
    ShowMessageDialogComponent,
    MatDialogModule
  ]
})
export class SharedModule { }
