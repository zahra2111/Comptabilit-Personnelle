import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/User/user.service';
import { User } from '../../../services/User/user';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class AppSideLoginComponent {
  username: string = ''; // Changed from email to username
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Handle login error
        console.error('Login error', err);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
