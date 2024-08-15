import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Comptabilité Personnelle';

  constructor(private translate: TranslateService) {
    const savedLanguage = localStorage.getItem('language') || 'en';
    this.translate.setDefaultLang('fr');
    this.setLocale(savedLanguage);
    this.translate.use(savedLanguage);

    // Listen for language change and update locale accordingly
    this.translate.onLangChange.subscribe(event => {
      this.setLocale(event.lang);
    });
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang); // Store the selected language
  }

  private setLocale(language: string) {
    switch (language) {
      case 'fr':
        registerLocaleData(localeFr);
        break;
      case 'en':
      default:
        registerLocaleData(localeEn);
        break;
    }
  }
}
