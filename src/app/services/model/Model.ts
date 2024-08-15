export class Model {
    constructor(
      public description: string,    // Default type for transactions
     // Default amount for transactions
      public montant: number,   // Default notes for transactions
      public type: string, 
      public usr: string,  // Default Compte (Account) reference
      public compte: string,   // Default Tiers reference
      public tiers: string, // Use IRI for transactions reference

      public id?: number             // Optional ID field
    ) {}
  }
  