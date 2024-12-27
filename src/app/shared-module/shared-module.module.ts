import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BaseComponentComponent } from './components/base-component/base-component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProgressBarComponent
    BaseComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HeaderComponent,
    ProgressBarComponent,
    FooterComponent
  ]
})
export class SharedModuleModule { }
