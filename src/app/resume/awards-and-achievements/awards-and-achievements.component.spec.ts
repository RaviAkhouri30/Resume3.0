import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsAndAchievementsComponent } from './awards-and-achievements.component';

describe('AwardsAndAchievementsComponent', () => {
  let component: AwardsAndAchievementsComponent;
  let fixture: ComponentFixture<AwardsAndAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardsAndAchievementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsAndAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
