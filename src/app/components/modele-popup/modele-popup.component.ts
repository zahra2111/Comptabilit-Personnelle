import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Adjust the path as needed

@Component({
  selector: 'app-modele-popup',
  templateUrl: './modele-popup.component.html',
  styleUrls: ['./modele-popup.component.scss']
})
export class ModelePopupComponent implements OnInit {
  modeleForm: FormGroup;
  popupId = 'modelePopup';

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.modeleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
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
