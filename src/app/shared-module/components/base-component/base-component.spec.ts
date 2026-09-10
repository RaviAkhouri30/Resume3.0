import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IViewModel } from '../../interfaces/i-view-model';

import { BaseComponent } from './base-component';

@Component({ template: '', standalone: false })
class TestBaseComponent extends BaseComponent<unknown> {
  constructor() {
    super();
    this.model = {
      data: undefined,
      inIt: () => of(undefined)
    } satisfies IViewModel<unknown>;
  }
}

describe('BaseComponentComponent', () => {
  let component: TestBaseComponent;
  let fixture: ComponentFixture<TestBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestBaseComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
