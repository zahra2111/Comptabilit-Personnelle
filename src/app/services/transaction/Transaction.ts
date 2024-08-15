export class Transaction {

    constructor(
      public type: string,
      public amount: number,     
      public Notes: string,
      public date: Date,
      public usr: string, // Use IRI for user reference
      public Compte: string, // Use IRI for transactions reference
      public tiers: string, // Use IRI for transactions reference
      public id?: number       
    ) {}
  }
  