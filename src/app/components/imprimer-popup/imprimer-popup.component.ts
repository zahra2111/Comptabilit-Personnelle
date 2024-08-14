import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-imprimer-popup',
  templateUrl: './imprimer-popup.component.html',
  styleUrls: ['./imprimer-popup.component.scss']
})
export class ImprimerPopupComponent {
  
  fromDate: Date | null = null;
  toDate: Date | null = null;
  accountSelected: boolean = false;
  operationType: string = 'toutes'; // Valeur par défaut
  popupId: string = 'imprimerPopup'; // Initialize the popupId property
  constructor(private popupService: PopupService) {}
  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

 

  onPrint() {
    // Logique d'impression ici
    console.log('Impression de:', {
      fromDate: this.fromDate,
      toDate: this.toDate,
      accountSelected: this.accountSelected,
      operationType: this.operationType
      
    });
    // Vous pouvez appeler une méthode pour imprimer les données ici
  }

  printByDate() {
    console.log('Impression par date');
    // Ajoutez votre logique d'impression par date ici
  }

  printByCategory() {
    console.log('Impression par catégorie');
    // Ajoutez votre logique d'impression par catégorie ici
  }

  printByPaymentMode() {
    console.log('Impression par mode de paiement');
    // Ajoutez votre logique d'impression par mode de paiement ici
  }

  printByThirdParty() {
    console.log('Impression par tiers');
    // Ajoutez votre logique d'impression par tiers ici
  }

  printTotalByCategory() {
    console.log('Impression du total par catégorie');
    // Ajoutez votre logique d'impression du total par catégorie ici
  }

  printTotalByThirdParty() {
    console.log('Impression du total par tiers');
    // Ajoutez votre logique d'impression du total par tiers ici
  }

  printTotalByPaymentMode() {
    console.log('Impression du total par mode de paiement');
    // Ajoutez votre logique d'impression du total par mode de paiement ici
  }

  exportToExcel() {
    console.log('Exportation vers Excel');
    // Ajoutez votre logique d'exportation vers Excel ici
  }

  exportToPDF() {
    console.log('Exportation vers PDF');
    // Ajoutez votre logique d'exportation vers PDF ici
  }
  
}