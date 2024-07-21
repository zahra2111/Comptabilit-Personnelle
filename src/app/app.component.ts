import { Component, OnInit } from '@angular/core';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isPopupOpen = false;

  constructor(private popupService: PopupService) {}

  ngOnInit() {
    this.popupService.popupState$.subscribe((state: boolean) => {
      this.isPopupOpen = state;
    });
  }
}
