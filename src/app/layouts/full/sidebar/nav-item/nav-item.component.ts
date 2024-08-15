import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { PopupService } from '../../../../services/popup.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./app-nav-item.component.css']
})
export class AppNavItemComponent implements OnChanges {
  @Input() item: NavItem | any;
  @Input() depth: any;
  @Output() selectedItem = new EventEmitter<NavItem>(); // Output to emit the selected item
  isExpanded = false;

  constructor(public navService: NavService, public router: Router, private popupService: PopupService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnChanges() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        this.isExpanded = url.includes(this.item.route);
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    } else {
      this.isExpanded = !this.isExpanded;
    }

    // Emit the selected item to the parent component
    this.selectedItem.emit(item);

    // Scroll to top
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });

    // Handle specific routes for popups
    if (item.route === '/debiter') {
      this.popupService.openPopup('debiterPopup');
      return;
    }

    if (item.route === '/crediter') {
      this.popupService.openPopup('crediterPopup');
      return;
    }
  }
}
