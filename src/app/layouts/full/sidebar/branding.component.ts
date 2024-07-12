import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
  <div class="branding">
  <img src="./assets/images/logos/favicon.png" alt="logo" />
  <span class="brand-name">Ma comptabilité</span>
</div>
  `,
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent {
  constructor() {}
}
