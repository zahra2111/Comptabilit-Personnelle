import { Component, Input, OnChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { PopupService } from '../../../../services/popup.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router, private popupService: PopupService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // Add logic if needed
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (item.route === '/debiter') {
      this.popupService.openPopup('debiterPopup');
      return;
    }

    if (item.route === '/crediter') {
      this.popupService.openPopup('crediterPopup');
      return;
    }

    if (item.route === '/virement') {
      this.popupService.openPopup('virementPopup');
      return;
    }

    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}
