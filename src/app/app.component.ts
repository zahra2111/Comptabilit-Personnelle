import { Component, OnInit } from '@angular/core';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCrediterPopupOpen = false;
  isDebiterPopupOpen = false;

  constructor(public popupService: PopupService) {}

  ngOnInit() {
    this.popupService.getPopupState('crediterPopup').subscribe((state: boolean) => {
      this.isCrediterPopupOpen = state;
    });

    this.popupService.getPopupState('debiterPopup').subscribe((state: boolean) => {
      this.isDebiterPopupOpen = state;
    });
  }
}
