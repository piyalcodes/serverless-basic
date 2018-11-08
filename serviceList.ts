import {
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

//import { Config } from "./Config";

export class CognitoUserService {
  private pool;
  private email;
  private password;

  signUp() {

    const attributeList = [];

    const dataEmail = {
      Name: "email",
      Value: this.email
    };
    /*const dataPhoneNumber = {
      Name: "phone_number",
      Value: "+15555555555"
    };*/
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    //const attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    //attributeList.push(attributePhoneNumber);

    return new Promise((resolve, reject) => {

      this.pool.signUp(
        this.email,
        this.password,
        attributeList,
        null,
        (err, result) => {

          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
          }

        }
      );
    });
  }

  login() {
    const authenticationData = {
      Username: this.email,
      Password: this.password
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: this.email,
      Pool: this.pool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject
      });
    });
  }

  refresh(token) {
    return new Promise((resolve, reject) => {
      this.pool.client.makeUnauthenticatedRequest(
        "initiateAuth",
        {
          //ClientId: Config.get("cognito_user_pool_client_id"),
          ClientId: "12uelf64r5dbmmsfil4cc64du9",
          AuthFlow: "REFRESH_TOKEN_AUTH",
          AuthParameters: {
            REFRESH_TOKEN: token
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

  constructor(email, password) {
    this.email = email;
    this.password = password;

    this.pool = new CognitoUserPool({
      UserPoolId: "eu-central-1_sZ1BfcEt8",
      ClientId: "12uelf64r5dbmmsfil4cc64du9"
    });
  }
}