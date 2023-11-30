import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMainComponent } from './options-main.component';

describe('OptionsMainComponent', () => {
  let component: OptionsMainComponent;
  let fixture: ComponentFixture<OptionsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
