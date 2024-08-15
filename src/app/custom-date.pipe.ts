import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: Date | string | number, format?: string): string {
    const currentLang = this.translateService.currentLang || 'fr';
    let dateFormat = format || 'mediumDate';
  
    // Example: Adjust format based on language
    if (currentLang === 'fr') {
      dateFormat = 'dd/MM/yyyy'; // French format
    } else if (currentLang === 'en') {
      dateFormat = 'MM/dd/yyyy'; // English format
    }
  
    return formatDate(value, dateFormat, currentLang);
  }
}
