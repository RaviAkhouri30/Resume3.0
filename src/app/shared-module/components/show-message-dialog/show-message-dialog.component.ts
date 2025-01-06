import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-message-dialog',
  templateUrl: './show-message-dialog.component.html',
  styleUrl: './show-message-dialog.component.css',
  standalone: false
})
export class ShowMessageDialogComponent {

  public readonly data: DialogMessage = inject(MAT_DIALOG_DATA)

}

export interface DialogMessage {
  title: string;
  message: string;
}