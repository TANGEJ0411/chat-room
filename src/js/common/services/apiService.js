// 匯入 getApiResponse 函數和 post 函數
import getApiResponse from '../utils/getApiResponse';
import { postWithParams, post } from './_axios';

/**
 * 定義 fetchData 函數，
 * 接收 url 和 data 參數，
 * 用於發送 post 請求，
 * 且加入計時存入 sessionStorage，
 * 並且將結果通過 getApiResponse 函數進行處理後返回。
 */
export const fetchData = async (url, data, contentType) => {
    const response = await post(url, data, contentType);
    return getApiResponse(response);
};

/**
 * 定義 fetchPostParamsData 函數，
 * 接收 url 和 data 參數，
 * 用於發送 post 請求，
 * 且加入計時存入 sessionStorage，
 * 並且將結果通過 getApiResponse 函數進行處理後返回。
 */
export const fetchPostParamsData = async (url, data) => {
    const response = await postWithParams(url, data);
    return getApiResponse(response);
};


/**
 * 定義 handleFetchError 函數，
 * 接收一個錯誤對象，
 * 將錯誤信息和布林值 false 封裝到一個數組中。
 */
export const handleFetchError = (error) => {
    return [false, error];
};

/**
 * 定義 fetchWrapper 函數，
 * 接收 url 和 data 參數，
 * 透過 fetchData 函數獲取資料，
 * 如果發生錯誤就通過 handleFetchError 函數進行處理。
 */
export const fetchWrapper = async (url, data, contentType) => {
    try {
        return await fetchData(url, data, contentType);
    } catch (error) {
        alert('請重新登入');
        sessionStorage.clear();
        window.location.hash = '/Login';
        window.location.reload();
        return handleFetchError(error.message);
    }
};

/**
 * 定義 fetchPostParamsWrapper 函數，
 * 接收 url 和 data 參數，
 * 透過 fetchPostParamsData 函數獲取資料，
 * 如果發生錯誤就通過 handleFetchError 函數進行處理。
 */
export const fetchPostParamsWrapper = async (url, data) => {
    try {
        return await fetchPostParamsData(url, data);
    } catch (error) {
        return handleFetchError(error.message);
    }
};