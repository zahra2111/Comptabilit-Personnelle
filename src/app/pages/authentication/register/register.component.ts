import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/User/user.service';
import { User } from '../../../services/User/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.css'
})
export class AppSideRegisterComponent {

  passwordsMatch: boolean = true;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (form.valid && this.checkPasswords(form)) {
      const user = new User(form.value.nomPrenom, form.value.email, form.value.password,[],[],[]);
      this.userService.addUser(user)
        .subscribe(response => {
          console.log('User added successfully', response);
          form.resetForm();
          this.router.navigate(['/authentication/login']);
        }, error => {
          console.error('Error adding user', error);
        });
    }
  }

  checkPasswords(form: NgForm): boolean {
    if (form.value.password === form.value.confirmPassword) {
      this.passwordsMatch = true;
      return true;
    } else {
      this.passwordsMatch = false;
      return false;
    }
  }
}
