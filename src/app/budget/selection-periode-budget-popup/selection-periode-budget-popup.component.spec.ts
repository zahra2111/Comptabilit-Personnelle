import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPeriodeBudgetPopupComponent } from './selection-periode-budget-popup.component';

describe('SelectionPeriodeBudgetPopupComponent', () => {
  let component: SelectionPeriodeBudgetPopupComponent;
  let fixture: ComponentFixture<SelectionPeriodeBudgetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionPeriodeBudgetPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionPeriodeBudgetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
