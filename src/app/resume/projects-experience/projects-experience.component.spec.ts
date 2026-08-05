import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsExperienceComponent } from './projects-experience.component';

describe('ProjectsExperienceComponent', () => {
  let component: ProjectsExperienceComponent;
  let fixture: ComponentFixture<ProjectsExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
