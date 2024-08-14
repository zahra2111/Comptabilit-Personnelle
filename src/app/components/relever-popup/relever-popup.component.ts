import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../services/popup.service'; // Ajustez le chemin si nécessaire



interface Relever {
  id: number;
  description: string;
  importDate: Date;
}

@Component({
  selector: 'app-relever-popup',
  templateUrl: './relever-popup.component.html',
  styleUrls: ['./relever-popup.component.scss']
})
export class ReleverPopupComponent implements OnInit {
  releverForm: FormGroup;
  popupId = 'releverPopup';
  releves: Relever[] = []; // Initialisation avec un tableau vide
  selectedFile: File | null = null;

  constructor(private popupService: PopupService, private fb: FormBuilder) {
    this.releverForm = this.fb.group({
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger des relevés existants (vous pouvez remplacer cela par une récupération réelle de données)
    this.releves = [
      { id: 1, description: 'Relevé de Juillet 2023', importDate: new Date('2023-07-15') },
      { id: 2, description: 'Relevé d’Août 2023', importDate: new Date('2023-08-15') },
    ];
  }
  closePopup() {
    this.popupService.closePopup(this.popupId);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.releverForm.valid && this.selectedFile) {
      const newReleve: Relever = {
        id: this.releves.length + 1, // Génération simple d'ID
        description: this.releverForm.get('description')?.value,
        importDate: new Date(),
      };

      this.releves.push(newReleve);
      console.log('Nouveau relevé importé :', this.releves); // Afficher la liste mise à jour
      this.closePopup(); // Fermer le popup après la soumission
    }
  }
}
