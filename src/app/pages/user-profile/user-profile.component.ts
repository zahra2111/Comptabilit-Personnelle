import { Component ,OnInit,} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SettingsComponent } from '../settings/settings.component'; // Adjust the path as per your project structure

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.css']

})
export class UserProfileComponent implements OnInit{
  
  constructor() { }

  ngOnInit(): void {
  }
  activeTab: 'profile' | 'security' = 'profile' ;
  selectedFileUrl: string | ArrayBuffer | null = null;
  userName: string = 'Hembo Tingor';
  userEmail: string = 'Hembo@gmail.com';
  pass:string ='123455'

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.selectedFileUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

}
