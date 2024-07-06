import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericOptionsComponent } from './generic-options.component';

describe('GenericOptionsComponent', () => {
  let component: GenericOptionsComponent;
  let fixture: ComponentFixture<GenericOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericOptionsComponent]
    });
    fixture = TestBed.createComponent(GenericOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
