import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationAwardsAndAcheivementComponent } from './education-awards-and-acheivement.component';

describe('EducationAwardsAndAcheivementComponent', () => {
  let component: EducationAwardsAndAcheivementComponent;
  let fixture: ComponentFixture<EducationAwardsAndAcheivementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationAwardsAndAcheivementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationAwardsAndAcheivementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
