export class BankAccount {

    constructor(
      public nom: string,
      public initialSum: number,
      public type: string,
      public usr: string, // Use IRI for user reference
      public id?: number 
      
    ) {}
  }
  