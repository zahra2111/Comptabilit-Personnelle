import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire
@Component({
  selector: 'app-modifier-popup',
  templateUrl: './modifier-popup.component.html',
  styleUrls: ['./modifier-popup.component.scss']
})
export class ModifierPopupComponent implements OnInit {
  modifierForm: FormGroup;
  popupId = 'modifierPopup';
  budgetItems: any[] = []; // Remplacez 'any' par votre type de données spécifique

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.modifierForm = this.fb.group({
      itemId: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onUpdate(): void {
    if (this.modifierForm.valid) {
      const itemId = this.modifierForm.value.itemId;
      const index = this.budgetItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        this.budgetItems[index] = {
          ...this.budgetItems[index],
          montant: this.modifierForm.value.montant,
          description: this.modifierForm.value.description,
          date: new Date()
        };
        this.modifierForm.reset();
      }
    }
  }

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }
}