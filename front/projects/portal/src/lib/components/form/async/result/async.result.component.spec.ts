import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncResultComponent } from './async.result.component';

describe('AccountActivateComponent', () => {
  let component: AsyncResultComponent;
  let fixture: ComponentFixture<AsyncResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
