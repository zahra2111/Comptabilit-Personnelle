import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modifier-montants-budgetaire-popup',
  templateUrl: './modifier-montants-budgetaire-popup.component.html',
  styleUrls: ['./modifier-montants-budgetaire-popup.component.scss']
})
export class ModifierMontantsBudgetairePopupComponent {
  @Output() close = new EventEmitter<void>();
  nouveauMontant: number | null = null;

  modifier() {
    console.log('Montant modifié:', this.nouveauMontant);
    // Logique pour modifier le montant budgétaire
  }

  fermer() {
    this.close.emit();
  }
}