import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selection-periode-budget-popup',
  templateUrl: './selection-periode-budget-popup.component.html',
  styleUrls: ['./selection-periode-budget-popup.component.scss']
})
export class SelectionPeriodeBudgetPopupComponent {
  @Output() close = new EventEmitter<void>();
  dateDebut: string | null = null;
  dateFin: string | null = null;

  selectionner() {
    console.log('Période sélectionnée:', this.dateDebut, 'à', this.dateFin);
    // Logique pour sélectionner la période budgétaire
  }

  fermer() {
    this.close.emit();
  }
}