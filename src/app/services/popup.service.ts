import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popupState = new BehaviorSubject<boolean>(false);
  popupState$ = this.popupState.asObservable();

  openPopup() {
    this.popupState.next(true);
  }

  closePopup() {
    this.popupState.next(false);
  }
}
