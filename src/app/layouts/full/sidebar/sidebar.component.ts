import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { TranslateService } from '@ngx-translate/core'; // Import ngx-translate

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Ensure this line is present

})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  constructor(public navService: NavService, private translate: TranslateService) {}

  changeLanguage(language: string) {
    this.translate.use(language);
  }
 
  ngOnInit(): void {}
}
