import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/User/user.service';
import { User } from '../../../services/User/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl : './register.css'
})
export class AppSideRegisterComponent {

  constructor(private router: Router, private userService: UserService) {}
  onSubmit(form: NgForm) {
    if (form.valid) {
      const user = new User(form.value.nomPrenom, form.value.email, form.value.password);
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
}
