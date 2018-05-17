import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorIconComponent } from './form.error.icon.component';

describe('AccountActivateComponent', () => {
  let component: FormErrorIconComponent;
  let fixture: ComponentFixture<FormErrorIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
