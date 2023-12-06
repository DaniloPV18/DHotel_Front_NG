import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersConfirmationComponent } from './users-confirmation.component';

describe('UsersConfirmationComponent', () => {
  let component: UsersConfirmationComponent;
  let fixture: ComponentFixture<UsersConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
