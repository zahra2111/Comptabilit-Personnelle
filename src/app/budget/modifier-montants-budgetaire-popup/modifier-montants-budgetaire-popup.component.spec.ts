import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMontantsBudgetairePopupComponent } from './modifier-montants-budgetaire-popup.component';

describe('ModifierMontantsBudgetairePopupComponent', () => {
  let component: ModifierMontantsBudgetairePopupComponent;
  let fixture: ComponentFixture<ModifierMontantsBudgetairePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMontantsBudgetairePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierMontantsBudgetairePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
