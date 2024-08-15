import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root', // Or 'any' if you want to provide it in a specific module
})
export class PopupService {
  private popupStates: { [key: string]: BehaviorSubject<boolean> } = {};

  getPopupState(popupId: string): Observable<boolean> {
    if (!this.popupStates[popupId]) {
      this.popupStates[popupId] = new BehaviorSubject<boolean>(false);
    }
    return this.popupStates[popupId].asObservable();
  }

  openPopup(popupId: string) {
    if (!this.popupStates[popupId]) {
      this.popupStates[popupId] = new BehaviorSubject<boolean>(false);
    }
    this.popupStates[popupId].next(true);
  }

  closePopup(popupId: string) {
    if (this.popupStates[popupId]) {
      this.popupStates[popupId].next(false);
    }
  }
}
