/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutocompleteAutoActiveFirstOptionExampleComponent } from './Autocomplete-Auto-Active-First-Option-Example.component';

describe('AutocompleteAutoActiveFirstOptionExampleComponent', () => {
  let component: AutocompleteAutoActiveFirstOptionExampleComponent;
  let fixture: ComponentFixture<AutocompleteAutoActiveFirstOptionExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteAutoActiveFirstOptionExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteAutoActiveFirstOptionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
