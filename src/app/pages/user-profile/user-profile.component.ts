import { Component ,OnInit,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { User } from '../../services/User/user';
import { Router } from '@angular/router'; // Import Router
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.css']

})
export class UserProfileComponent implements OnInit{
  userInfo: any = {};
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  accountActivation: boolean = false; // Property for the checkbox

  constructor(private userService: UserService, private authService: AuthService, private router: Router,) { }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.userInfo = user;
      },
      error => {
        console.error('Error fetching user info:', error);
      }
    );
  }
  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    if (this.currentPassword && this.newPassword) {
      this.authService.changePassword(this.userInfo.email, this.currentPassword, this.newPassword).subscribe(
        () => {
          alert('Mot de passe changé avec succès.');
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error => {
          console.error('Erreur lors du changement de mot de passe:', error);
          alert('Une erreur est survenue lors du changement du mot de passe.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs de mot de passe.');
    }
  }
  deleteAccount(): void {
    if (this.accountActivation && this.userInfo.id) {
      if (confirm('Etes-vous sûr de vouloir supprimer votre compte?')) {
        this.userService.deleteUser(this.userInfo.id).subscribe(
          () => {
            alert('Votre compte a été supprimé avec succès.');
            localStorage.removeItem('authToken'); // Remove the token
            this.router.navigate(['/authentication/login']); // Redirect to login page
          },
          (error) => {
            console.error('Error deleting account:', error);
            alert('Une erreur s\'est produite lors de la suppression de votre compte.');
          }
        );
      }
    } else {
      alert('Veuillez confirmer la suppression de votre compte.');
    }
  }
 
}



