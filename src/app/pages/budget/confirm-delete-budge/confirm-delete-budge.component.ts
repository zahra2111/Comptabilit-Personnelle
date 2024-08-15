import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-delete-budge.component.html',
  styleUrls: ['./confirm-delete-budge.component.scss']
})
export class ConfirmDeleteBudgeComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteBudgeComponent>) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
