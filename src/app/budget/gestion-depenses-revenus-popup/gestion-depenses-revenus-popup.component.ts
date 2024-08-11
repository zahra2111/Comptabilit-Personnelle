import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gestion-depenses-revenus-popup',
  templateUrl: './gestion-depenses-revenus-popup.component.html',
  styleUrls: ['./gestion-depenses-revenus-popup.component.scss']
})
export class GestionDepensesRevenusPopupComponent {
  @Output() close = new EventEmitter<void>();
  description: string = '';
  montant: number | null = null;

  ajouter() {
    console.log('Dépense/Revenu ajouté:', this.description, this.montant);
    // Logique pour ajouter une dépense ou un revenu
  }

  fermer() {
    this.close.emit();
  }
}