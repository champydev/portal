import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSigninComponent } from './account.signin.component';

describe('AccountSigninComponent', () => {
  let component: AccountSigninComponent;
  let fixture: ComponentFixture<AccountSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
