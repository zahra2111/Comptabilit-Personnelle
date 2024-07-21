import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Adjust path as needed

@Component({
  selector: 'app-debiter-popup',
  templateUrl: './debiter-popup.component.html',
  styleUrls: ['./debiter-popup.component.scss']
})
export class DebiterPopupComponent implements OnInit {
  debitForm: FormGroup;

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.debitForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      mode: ['', Validators.required],
      tiers: ['', Validators.required],
      categories: ['', Validators.required],
      ref: ['', Validators.required],
      type: ['debit', Validators.required]
    });
  }

  ngOnInit(): void {}

  closePopup() {
    this.popupService.closePopup();
  }

  onSubmit() {
    if (this.debitForm.valid) {
      console.log(this.debitForm.value);
      this.closePopup(); // Close popup after submission
    }
  }
}
