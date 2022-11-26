import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-container',
  templateUrl: './resume-container.component.html',
  styleUrls: ['./resume-container.component.css']
})
export class ResumeContainerComponent implements OnInit {

  private elementRef!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

}
