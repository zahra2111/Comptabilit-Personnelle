import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  onProfilClick() {
      this.router.navigate(['/profile']);
    
  }
  
  onBankClick() {
    this.router.navigate(['/bank-account']);
  
}
onSettingsClick() {
  this.router.navigate(['/settings']);

}
onLogout() {
  this.authService.logout();
}

  constructor(private authService: AuthService,public dialog: MatDialog, public router: Router) {}
}
