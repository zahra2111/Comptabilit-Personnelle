
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Adjust path as needed

@Component({
  selector: 'app-crediter-popup',
  templateUrl: './crediter-popup.component.html',
  styleUrls: ['./crediter-popup.component.scss']
})
export class CrediterPopupComponent implements OnInit {
  creditForm: FormGroup;

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.creditForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      mode: ['', Validators.required],
      tiers: ['', Validators.required],
      categories: ['', Validators.required],
      ref: ['', Validators.required],
      type: ['credit', Validators.required]
    });
  }

  ngOnInit(): void {}

  closePopup() {
    this.popupService.closePopup();
  }

  onSubmit() {
    if (this.creditForm.valid) {
      console.log(this.creditForm.value);
      this.closePopup(); // Close popup after submission
    }
  }
}
