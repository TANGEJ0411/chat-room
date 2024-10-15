
/**
 * 解析 API Response 格式，返回 Tuple 狀態結構
 * 
 * @returns {array} [api成功, 回傳訊息, 回傳資料, 回傳日期時間, 回傳代碼]
 */
export default function getApiResponse(response) {
    
    return [
        response?.isSuccess,
        response?.data,
        response?.returnMessage,
        response?.returnCode,
        response?.serverTime
    ];
}