import axios from "axios";

const commonHeader = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-API-Key": "CUSTOMER",
};

const makeAPIRequest = (options: any) =>
  new Promise(async (resolve, reject) => {
    // console.log(`API call for ${options.url} options :: `, options);
    axios(options)
      .then((response) => {
        
        //console.log(`${options.url} API response :: `, response);
        resolve(response);
      })
      .catch((error) => {
        
        //console.log(`${options.url} API error :: `, error.response);
        reject(error);
      });
  });

export { makeAPIRequest, commonHeader };
