import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire
@Component({
  selector: 'app-selectioner-popup',
  templateUrl: './selectioner-popup.component.html',
  styleUrls: ['./selectioner-popup.component.scss']
})
export class SelectionerPopupComponent implements OnInit {
  selectionerForm: FormGroup;
  popupId = 'selectionerPopup';
  periodesSelectionees: any[] = []; // Remplacez 'any' par votre type de données spécifique

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.selectionerForm = this.fb.group({
      periode: [''],
      mois: [{ value: '', disabled: true }],
      trimestre: [{ value: '', disabled: true }],
      annee: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.onPeriodChange();
  }

  onPeriodChange(): void {
    this.selectionerForm.get('periode')?.valueChanges.subscribe(value => {
      if (value === 'mois') {
        this.selectionerForm.get('mois')?.enable();
        this.selectionerForm.get('trimestre')?.disable();
        this.selectionerForm.get('annee')?.disable();
      } else if (value === 'trimestre') {
        this.selectionerForm.get('trimestre')?.enable();
        this.selectionerForm.get('mois')?.disable();
        this.selectionerForm.get('annee')?.disable();
      } else if (value === 'annee') {
        this.selectionerForm.get('annee')?.enable();
        this.selectionerForm.get('mois')?.disable();
        this.selectionerForm.get('trimestre')?.disable();
      } else {
        this.selectionerForm.get('mois')?.disable();
        this.selectionerForm.get('trimestre')?.disable();
        this.selectionerForm.get('annee')?.disable();
      }
    });
  }

  onSelect(): void {
    if (this.selectionerForm.valid) {
      const selectedPeriod = {
        id: this.periodesSelectionees.length + 1, // Générer un ID unique
        description: this.selectionerForm.value.periode,
        dateSelection: new Date()
      };
      this.periodesSelectionees.push(selectedPeriod);
      this.selectionerForm.reset();
    }
  }

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }
}
