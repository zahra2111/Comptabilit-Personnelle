import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../services/category/category';

@Component({
  selector: 'app-addbudget',
  templateUrl: './addbudget.component.html',
  styleUrls: ['./addbudget.component.scss']
})
export class AddbudgetComponent {
  budgetForm: FormGroup;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddbudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: Category[] },
    private fb: FormBuilder
  ) {
    this.budgetForm = this.fb.group({
      montant: ['', Validators.required],
      APartirDe: ['', Validators.required],
      duree: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.categories = data.categories || [];
  }
  onSubmit(): void {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;
      formValue.montant = parseFloat(formValue.montant); // Convert montant to float
      formValue.APartirDe = new Date(formValue.APartirDe).toISOString(); // Convert date to ISO string if necessary
  
      this.dialogRef.close(formValue); // Pass form values to the dialogRef
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
