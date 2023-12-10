import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayHistoricComponent } from './pay-historic.component';

describe('PayHistoricComponent', () => {
  let component: PayHistoricComponent;
  let fixture: ComponentFixture<PayHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayHistoricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
