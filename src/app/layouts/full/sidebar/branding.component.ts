import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
  <div class="branding">
  <div class="logo-container">
  <img src="./assets/images/logos/favicon.png" alt="logo" />
  <span class="brand-name">BudgetPro</span>
  </div>
  </div>
  `,
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent {
  constructor() {}
}
