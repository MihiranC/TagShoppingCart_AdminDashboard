export class SignUp {
  password: string;
  confirmpassword: string;
  username: string;
  encryptedpassword: string;
  encryptedusername: string;
  isvalid: boolean;
  userID: number;

  // password policy
  capitalLetters: string;
  simpleLetters: string;
  alphaNumericLetters: string;
  numaricLetters: string;

}
