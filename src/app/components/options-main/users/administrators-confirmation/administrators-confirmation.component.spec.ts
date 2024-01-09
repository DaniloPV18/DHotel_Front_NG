import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsConfirmationComponent } from './administrators-confirmation.component';

describe('AdministratorsConfirmationComponent', () => {
  let component: AdministratorsConfirmationComponent;
  let fixture: ComponentFixture<AdministratorsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorsConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
