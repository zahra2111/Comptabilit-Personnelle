
export class User {

  constructor(
    public nomPrenom: string,
    public email: string,
    public plainPassword: string,
    public banks: string[],
    public budgets: string[],
    public categories: string[],
    public transactions: string[],

    
    public id?: number 
  ) {}
}
