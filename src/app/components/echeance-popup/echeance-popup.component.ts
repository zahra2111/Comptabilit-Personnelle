import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Adjust path as needed

interface Echeance {
  id: number;
  name: string;
  debutDate: Date;
  finDate: Date;
}

@Component({
  selector: 'app-echeance-popup',
  templateUrl: './echeance-popup.component.html',
  styleUrls: ['./echeance-popup.component.scss']
})
export class EcheancePopupComponent implements OnInit {
  echeanceForm: FormGroup;
  popupId = 'echeancePopup';
  echeances: Echeance[] = []; // Initialize with an empty array

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.echeanceForm = this.fb.group({
      name: ['', Validators.required],
      debutDate: ['', Validators.required],
      finDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load existing echeances (you can replace this with a real data fetch if needed)
    this.echeances = [
      { id: 1, name: 'Echeance 1', debutDate: new Date('2023-08-01'), finDate: new Date('2023-08-15') },
      { id: 2, name: 'Echeance 2', debutDate: new Date('2023-09-01'), finDate: new Date('2023-09-30') },
    ];
  }

  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

  onSubmit() {
    if (this.echeanceForm.valid) {
      const newEcheance: Echeance = {
        id: this.echeances.length + 1, // Simple ID generation
        ...this.echeanceForm.value
      };

      this.echeances.push(newEcheance);
      console.log(this.echeances); // Output the new list of echeances
      this.closePopup(); // Close popup after submission
    }
  }
}
