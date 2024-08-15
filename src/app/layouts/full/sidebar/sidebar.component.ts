import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitter, Output } from '@angular/core';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  constructor(public navService: NavService, private translate: TranslateService) {}
  
  @Output() selected = new EventEmitter<string>();

  onNavItemSelected(item: NavItem) {
    this.selected.emit(item.displayName);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {}
}
