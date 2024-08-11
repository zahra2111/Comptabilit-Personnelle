import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Adjust the path as needed

@Component({
  selector: 'app-echeance-popup',
  templateUrl: './echeance-popup.component.html',
  styleUrls: ['./echeance-popup.component.scss']
})
export class EcheancePopupComponent implements OnInit {
  echeanceForm: FormGroup;
  popupId = 'echeancePopup';

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.echeanceForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

  onSubmit() {
    if (this.echeanceForm.valid) {
      console.log(this.echeanceForm.value);
      this.closePopup(); // Close popup after submission
    }
  }
}
