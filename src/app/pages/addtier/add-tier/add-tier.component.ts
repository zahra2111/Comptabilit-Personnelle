import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tier } from '../../../services/tier/Tier'; // Update import path

@Component({
  selector: 'app-addtier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.scss']
})
export class AddTierComponent {
  tierForm: FormGroup;
  transactions: any[] = []; // Assuming transactions are objects with id and name

  constructor(
    public dialogRef: MatDialogRef<AddTierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transactions: any[] },
    private fb: FormBuilder
  ) {
    this.tierForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      commentaire: ['', Validators.required]
    });

    // Safely assign transactions, defaulting to an empty array if data.transactions is null or undefined
    this.transactions = data?.transactions || [];
  }

  onSubmit(): void {
    if (this.tierForm.valid) {
      const formValue = this.tierForm.value;
      const newTier = new Tier(
        formValue.nom,
        formValue.adresse,
        formValue.commentaire,
        `api/users/${formValue.userId}`, // Ensure userId is correctly provided
        formValue.transactions
      );
      this.dialogRef.close(newTier); // Pass the Tier object to the dialogRef
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
