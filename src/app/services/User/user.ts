
export class User {

  constructor(
    public nomPrenom: string,
    public email: string,
    public plainPassword: string,
    public banks: string[],
    public id?: number 
  ) {}
}
