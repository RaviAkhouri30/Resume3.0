import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ravi-resume-3';
  
  @HostListener('window:scroll')
  onScroll(event: Event) {
    console.log('scrolling');
  }
}
