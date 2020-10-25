/**
 * API configuration
 **/

import axios from 'axios';
// import { store } from '../index';

export const 
auth = (function() {
  return axios
    .get('env.json')
    .then(result => {
      return createAuthApi(result.data);
    })
    .catch(error => console.log('error:', error));
})();

var createAuthApi = env => {
  const auth = axios.create({
    baseURL: env.API_URL,
    // headers: {
    //   companyID: env.COMPANYID,
    // },
  });

  return auth
}