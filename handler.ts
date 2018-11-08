import "isomorphic-fetch"
import { CognitoUserService } from "./serviceList";

export const hello = async (event, context, cb) => {
  cb(null,
    {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }),
    }
  );
}

export const register = async (event, context, cb) => {
  const CU = new CognitoUserService("sdsdsd@gmail.com", "123123");
  return CU.signUp().then(response => {
    return cb(null,
      {
        statusCode: 200,
        body: JSON.stringify({
          status: "success",
          data: response
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      }
    );
  },
    response => {
      return cb(null,
        {
          statusCode: 400,
          body: JSON.stringify({
            status: "error",
            data: response
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          }
        }
      );
    }).catch(response => {
      return cb(null,
        {
          statusCode: 400,
          body: JSON.stringify({
            status: "error",
            data: response
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          }
        }
      );
    })

}

export const login = async (event, context, cb) => {
  const CU = new CognitoUserService("sdsddsd@gmail.com", "123123");
  return CU.login().then(response => {
    return cb(null,
      {
        statusCode: 200,
        body: JSON.stringify({
          status: "success",
          data: response
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      }
    );
  },
    response => {
      return cb(null,
        {
          statusCode: 400,
          body: JSON.stringify({
            status: "error",
            data: response
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          }
        }
      );
    }).catch(response => {
      return cb(null,
        {
          statusCode: 400,
          body: JSON.stringify({
            status: "error",
            data: response
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          }
        }
      );
    })

}

export const verify = (event, context, callback) => {

  
  event.response.autoConfirmUser = true;

  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoVerifyEmail = true;
  }

  // Return to Amazon Cognito
  callback(null, event);
}
