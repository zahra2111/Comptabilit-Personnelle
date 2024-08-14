import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire

@Component({
  selector: 'app-gerer-popup',
  templateUrl: './gerer-popup.component.html',
  styleUrls: ['./gerer-popup.component.scss']
})
export class GererPopupComponent implements OnInit {
  gererForm: FormGroup;
  popupId = 'gererPopup';
  gererItems: any[] = []; // Remplacez 'any' par votre type de données spécifique

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.gererForm = this.fb.group({
      type: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      categorie: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.gererForm.valid) {
      const newItem = {
        id: this.gererItems.length + 1, // Générer un ID unique
        ...this.gererForm.value,
        date: new Date()
      };
      this.gererItems.push(newItem);
      this.gererForm.reset();
    }
  }

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

}