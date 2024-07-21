export class User {

  constructor(
    public nomPrenom: string,
    public email: string,
    public plainPassword: string,

    public id?: number 
  ) {}
}
