import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceGraphComponent } from './experience-graph.component';

describe('ExperienceGraphComponent', () => {
  let component: ExperienceGraphComponent;
  let fixture: ComponentFixture<ExperienceGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
