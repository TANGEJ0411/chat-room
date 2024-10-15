import axios from 'axios';
import qs from 'qs';
import { getAccessToken } from '../utils/utils';

/**
 * 使用佇列處理 Axios 的請求和回應
 * @param {object} axios 
 * @param {number} MAX_CONCURRENT 
 * @returns {{ axios: object, detach: function }}
 */
const axiosQ = (axios, MAX_CONCURRENT = 1) => {
  const instance = {
    requestQueue: [],
    taskQueue: [],
    interceptors: {
      request: null,
      response: null
    },
    shiftInitial: () => {
      setTimeout(() => {
        if (instance.taskQueue.length < MAX_CONCURRENT) {
          instance.shift();
        }
      }, 0);
    },
    push: reqHandler => {
      instance.requestQueue.push(reqHandler);
      instance.shiftInitial();
    },
    shift: () => {
      if (instance.requestQueue.length) {
        const queued = instance.requestQueue.shift();
        queued.resolver(queued.request);
        instance.taskQueue.push(queued);
      }
    },
    requestHandler: req => {
      if (req?.headers?.['X-Query-Request'] === 'Y') {
        req.shouldAddToQueue = false;
        return req;
      } else {
        req.shouldAddToQueue = true;
        return new Promise(resolve => {
          instance.push({ request: req, resolver: resolve });
        });
      }
    },
    responseHandler: res => {
        const shouldAddToQueue = res?.headers?.['X-Query-Request'] === 'Y' || res.config.shouldAddToQueue;
  
        if (shouldAddToQueue) {
          // Shift the first task that matches the completed request
          instance.taskQueue = instance.taskQueue.filter(task => task.request !== res.config);
          instance.shift();
        }
        return res;
      },
    errorHandler: error => {
      if (error.config) {
        instance.removeFromTaskQueue(error.config);
        instance.shift();
      }
      return Promise.reject(error);
    },
    removeFromTaskQueue: (config) => {
      instance.taskQueue = instance.taskQueue.filter(task => task.request !== config);
    }
};
  instance.interceptors.request = axios.interceptors.request.use(
    instance.requestHandler
  );
  instance.interceptors.response = axios.interceptors.response.use(
    instance.responseHandler,
    instance.errorHandler
  );
  return {
    axios,
    detach: () => {
      axios.interceptors.request.eject(instance.interceptors.request);
      axios.interceptors.response.eject(instance.interceptors.response);
    }
  };
};

// 創建 Axios 實例
const axiosInstance = axios.create({
  baseURL: '../',
  withCredentials: true
});

// 創建 Axios 佇列工廠實例
const axiosQueueFactory = axiosQ(axiosInstance);
const axiosQueueInstance = axiosQueueFactory.axios;

// 設置默認的請求標頭
// axiosQueueInstance.defaults.headers.common['Content-Type'] = 'application/json, text/plain, */*';
axiosQueueInstance.defaults.headers.common['Accept'] = 'application/json';
axiosQueueInstance.defaults.headers.common['Accept-Language'] = 'zh-TW';
axiosQueueInstance.defaults.headers.common['AccessToken'] = getAccessToken();
axiosQueueInstance.defaults.timeout = 600000;

/**
 * 封裝 Axios 的 GET 請求
 * @param {string} url API endpoint 的網址
 * @param {Object} params 請求參數，預設為空物件
 * @param {Object} options Axios 的其他設定選項，預設為空物件
 * @returns {Promise} 回傳 Promise 物件
 */
export function get(url, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    axiosQueueInstance({
      url: '/psc' + url, // 請求的 API endpoint 網址
      method: 'GET', // 請求方法
      ...options, // 其他設定選項，例如 headers
      params // 請求參數
    }).then(response => {
      resolve(response.data); // 回傳 API 回應的資料
    }).catch(err => {
      reject(err); // 回傳錯誤訊息
    });
  });
}

/**
 * 封裝 Axios 的 post 用 params 請求
 * @param {string} url API endpoint 的網址
 * @param {Object} params 請求參數，預設為空物件
 * @param {Object} options Axios 的其他設定選項，預設為空物件
 * @returns {Promise} 回傳 Promise 物件
 */
export function postWithParams(url, params = {}, options = {}) {
  return new Promise((resolve, reject) => {
    axiosQueueInstance({
      url: '/psc' + url, // 請求的 API endpoint 網址
      method: 'POST', // 請求方法
      ...options, // 其他設定選項，例如 headers
      params // 請求參數
    }).then(response => {
      resolve(response.data); // 回傳 API 回應的資料
    }).catch(err => {
      reject(err); // 回傳錯誤訊息
    });
  });
}

// 封装 Axios 的 POST 請求
/**
 * @param {string} url - API endpoint 的網址
 * @param {object} data - 請求參數（預設為空物件）
 * @param {string} contentType - 請求的 Content-Type（預設為 application/json）
 * @returns {Promise<object>} - 回傳 Promise 物件
 */
export function post(url, data = {}, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    // 設定 Content-Type 的 config header
    const config = {
      headers: {
        'Content-Type': contentType,
      },
    };

    // 根據 Content-Type 處理requestData
    let requestData;
    if (contentType === 'application/json') {
      requestData = data; // 保持 JSON 格式
    } else if (contentType === 'application/x-www-form-urlencoded') {
      if (typeof data === 'object'){ // 如果 data 是物件才需要轉換
        requestData = qs.stringify(data); // 轉換成 x-www-form-urlencoded
      }else{
        requestData = data; // 如果 data 是字串，則保持不變
      }
    } else if (contentType === 'multipart/form-data') {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]); // 轉換成 FormData
      });
      requestData = formData;
      // 注意：對於 multipart/form-data，瀏覽器會自動設置 Content-Type，所以可以刪除 config.headers['Content-Type']
      delete config.headers['Content-Type'];
    }

    // 發送 POST 請求
    axiosQueueInstance.post('/psc' + url, requestData, config)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export default axiosQueueInstance;