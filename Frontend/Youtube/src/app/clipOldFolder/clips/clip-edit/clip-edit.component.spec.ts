/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClipEditComponent } from './clip-edit.component';

describe('ClipEditComponent', () => {
  let component: ClipEditComponent;
  let fixture: ComponentFixture<ClipEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
