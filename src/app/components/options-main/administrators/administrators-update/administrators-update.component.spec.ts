import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorsUpdateComponent } from './administrators-update.component';

describe('AdministratorsUpdateComponent', () => {
  let component: AdministratorsUpdateComponent;
  let fixture: ComponentFixture<AdministratorsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministratorsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministratorsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
