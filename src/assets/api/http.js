import axios from 'axios';
import QS from 'qs';
import {consoleError} from '@/assets/api/errorReporting.js'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(res => {
        if(res.data.code == "500"){
          consoleError(params,url,res)
        }
        resolve(res.data)
      })
      .catch(err => {
        consoleError(params, url, err)
        reject(err.data)
      })
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        if(res.data.code == "500"){
          consoleError(params, url, res)
        }
        resolve(res.data);
      })
      .catch(err => {
        consoleError(params,url, err)
        reject(err.data)
      })
  });
}
