export class Budget {

    constructor(
      public montant: number,
      public APartirDe: Date,
      public duree: string,
      public category: string, // Use IRI for user reference
      public usr: string, // Use IRI for user reference

      public id?: number 
      
    ) {}
  }
  