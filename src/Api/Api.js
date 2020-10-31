/**
 * API configuration
 **/

import axios from 'axios';

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
  });
  auth.interceptors.request.use(config => {
    // login
    if (config.data && config.data.method) {
      if (config.data.method === 'login') {
        const { loginName, password } = config.data;
        delete config.data.method;
        config.headers = {
          Authorization: 'Basic ' + window.btoa(loginName + ':' + password),
          companyID: env.COMPANYID,
        };
      if (config.data.method === 'forgot password') {
        delete config.data.method;
      }
      } 
    } else {
      let header = null;
      if (config.data && config.data.headers) {
        header = config.data.headers;
      }
      config.headers = {
        Authorization:  JSON.parse(localStorage.getItem('User')).token,
        ...header,
      };
    }
    return config;
  });

  return auth
}