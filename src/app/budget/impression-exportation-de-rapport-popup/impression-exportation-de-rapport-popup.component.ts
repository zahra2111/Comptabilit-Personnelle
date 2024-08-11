import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-impression-exportation-de-rapport-popup',
  templateUrl: './impression-exportation-de-rapport-popup.component.html',
  styleUrls: ['./impression-exportation-de-rapport-popup.component.scss']
})
export class ImpressionExportationDeRapportPopupComponent {
  @Output() close = new EventEmitter<void>();

  exporter() {
    console.log('Exportation du rapport...');
    // Logique d'exportation
  }

  imprimer() {
    console.log('Impression du rapport...');
    // Logique d'impression
  }

  fermer() {
    this.close.emit();
  }
}