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
  

  onBankStatementImported(data: any) {
    console.log('Relevé bancaire importé:', data);
    // Effectuez ici les actions nécessaires après l'importation
  }


  


  
  
 

  constructor(public popupService: PopupService) {}

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

