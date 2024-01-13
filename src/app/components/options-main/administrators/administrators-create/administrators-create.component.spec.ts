import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsCreateComponent } from './administrators-create.component';

describe('AdministratorsCreateComponent', () => {
  let component: AdministratorsCreateComponent;
  let fixture: ComponentFixture<AdministratorsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
