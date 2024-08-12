import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

interface Modele {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-modele-popup',
  templateUrl: './modele-popup.component.html',
  styleUrls: ['./modele-popup.component.scss']
})
export class ModelePopupComponent implements OnInit {
  modeleForm: FormGroup;
  popupId = 'modelePopup';
  modeles: Modele[] = [
    { id: 1, name: 'Modèle 1', description: 'Description 1' },
    { id: 2, name: 'Modèle 2', description: 'Description 2' }
    // Add more sample data as needed
  ];

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.modeleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

  onSubmit() {
    if (this.modeleForm.valid) {
      console.log(this.modeleForm.value);
      this.closePopup(); // Close popup after submission
    }
  }
}
