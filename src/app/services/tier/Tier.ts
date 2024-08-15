export class Tier {

    constructor(
      public nom: string,
      public adresse: string,
      public commentaire: string,
      public usr: string, // Use IRI for user reference
      public transactions: string[], // Include transactions
      public id?: number 
      
    ) {}
  }
  