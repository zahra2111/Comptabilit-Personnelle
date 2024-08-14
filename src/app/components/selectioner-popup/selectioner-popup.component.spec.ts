import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionerPopupComponent } from './selectioner-popup.component';

describe('SelectionerPopupComponent', () => {
  let component: SelectionerPopupComponent;
  let fixture: ComponentFixture<SelectionerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionerPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
