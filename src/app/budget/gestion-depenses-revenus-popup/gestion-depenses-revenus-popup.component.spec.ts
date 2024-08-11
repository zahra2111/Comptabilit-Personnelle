import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDepensesRevenusPopupComponent } from './gestion-depenses-revenus-popup.component';

describe('GestionDepensesRevenusPopupComponent', () => {
  let component: GestionDepensesRevenusPopupComponent;
  let fixture: ComponentFixture<GestionDepensesRevenusPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDepensesRevenusPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDepensesRevenusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
