import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUpdateComponent } from './pay-update.component';

describe('PayUpdateComponent', () => {
  let component: PayUpdateComponent;
  let fixture: ComponentFixture<PayUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
