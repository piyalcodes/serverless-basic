import { CognitoIdentityServiceProvider } from "aws-sdk";
 

export class CognitoUserService {
  private provider;
  private email;
  private password;
  private clientId = "12uelf64r5dbmmsfil4cc64du9";
  private UserPoolId = "eu-central-1_sZ1BfcEt8",

  signUp() {
    return new Promise((resolve, reject) => {
      this.provider.signUp(
        {
          ClientId: this.clientId,
		  UserPoolId: this.UserPoolId,
          Password: '123456',
          Username: 'tenamax@gmail.com',
          UserAttributes: [
            {
              Name: "name",
              Value: 'piyal'
            },
            {
              Name: "email",
              Value: 'tenamax@gmail.com'
            }
          ]
        },
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });
  }
 
  constructor(email, password) {
    this.email = email;
    this.password = password;

    this.provider = new CognitoIdentityServiceProvider();
  }
}