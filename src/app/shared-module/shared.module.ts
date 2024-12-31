import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BaseComponent } from './components/base-component/base-component';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    FooterComponent,
    ProgressBarComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ClipboardModule
  ],
  exports : [
    ProgressBarComponent,
    FooterComponent,
    BaseComponent,
    MatIconModule,
    ClipboardModule
  ]
})
export class SharedModule { }
