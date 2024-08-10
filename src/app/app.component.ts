import { Component, OnInit } from '@angular/core';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent implements OnInit {
  isVirementPopupOpen = false;
  isCrediterPopupOpen = false;
  isDebiterPopupOpen = false;
  showPopup = false;
  importedFile: File | null = null;

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  onFileImported(file: File): void {
    this.importedFile = file;
    // Ici, vous pouvez envoyer le fichier à votre serveur
    console.log('Fichier importé:', file.name);
  }
 

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.getPopupState('virementPopup').subscribe((state: boolean) => {
      this.isVirementPopupOpen = state;
    });
    this.popupService.getPopupState('crediterPopup').subscribe((state: boolean) => {
      this.isCrediterPopupOpen = state;
    });

    this.popupService.getPopupState('debiterPopup').subscribe((state: boolean) => {
      this.isDebiterPopupOpen = state;
    });
    

    
}
    
  }

