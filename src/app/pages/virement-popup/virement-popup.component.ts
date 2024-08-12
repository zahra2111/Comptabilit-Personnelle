import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-virement-popup',
  templateUrl: './virement-popup.component.html',
  styleUrls: ['./virement-popup.component.scss']
})
export class VirementPopupComponent implements OnInit {
  virementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VirementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.virementForm = this.fb.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      mode: ['', Validators.required],
      tiers: ['', Validators.required],
      categories: ['', Validators.required],
      ref: ['', Validators.required],
      duCompte: ['', Validators.required],
      versLeCompte: ['', Validators.required],
      type: ['virement', Validators.required]
    });
  }

  ngOnInit(): void {}

  closePopup(): void {
    this.dialogRef.close(); // Close the dialog
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      console.log(this.virementForm.value);
      this.dialogRef.close(this.virementForm.value); // Optionally pass form data
    }
  }
}
