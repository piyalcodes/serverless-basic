import { CognitoIdentityServiceProvider } from "aws-sdk";

export class CognitoUserService {
  private provider;
  private email;
  private password;
  private clientId = "wfdsfdffds";
  private poolId = "sdfdfdfdfdf";

  signUp() {
    return new Promise((resolve, reject) => {
      this.provider.signUp(
        {
          ClientId: this.clientId,
          Password: this.password,
          Username: this.email,
          UserAttributes: [
            {
              Name: "name",
              Value: this.email
            },
            {
              Name: "email",
              Value: this.email
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

  login() {
    return new Promise((resolve, reject) => {
      this.provider.initiateAuth(
        {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: this.clientId,
          poolId: this.poolId,
          AuthParameters: {
            PASSWORD: this.password,
            USERNAME: this.email
          }
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

  refresh(token) {
    console.log("Token: ", token)
    return new Promise((resolve, reject) => {
      console.log("Token Promise ")
      this.provider.initiateAuth(
        {
          AuthFlow: "REFRESH_TOKEN_AUTH",
          ClientId: this.clientId,
          AuthParameters: {
            REFRESH_TOKEN: token
          }
        },
        (err, result) => {

          console.log("err, result ", err, result)

          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    });
  }



  constructor(email = null, password = null) {
    this.email = email;
    this.password = password;

    this.provider = new CognitoIdentityServiceProvider();
  }
}
