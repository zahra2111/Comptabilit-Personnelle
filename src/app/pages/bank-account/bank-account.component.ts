import { Component ,OnInit } from '@angular/core';


@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrl : './bank-account.css'
})
export class BankAccountComponent implements OnInit {
  

  comptes = [
    { id: 1, name: 'John Doe', Devise: '$', Solde_initial: '120.0' },
    { id: 2, name: 'Jane Smith', Devise: '$', Solde_initial: '100.1' },
 
  ];  constructor() { }

  ngOnInit(): void {
  }
}
