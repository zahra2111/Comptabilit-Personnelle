import { Injectable } from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private localeSubject = new BehaviorSubject<string>('fr');
  public locale$ = this.localeSubject.asObservable();

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  setLocale(locale: string) {
    this.localeSubject.next(locale);
    this.localeId = locale;
  }

  getLocale() {
    return this.localeSubject.getValue();
  }
}
