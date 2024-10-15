import { useCallback, useEffect, useState } from 'react';
import { checkAuth } from '../utils/utils';

/**
 * 使用網頁載入狀態 Hook
 *
 * @param {boolean} initialPageLoading - 初始載入狀態 (可選)
 * @returns {object} - 返回包含載入相關函數及狀態的物件  
 * 
 * isPageLoading : 目前載入狀態  
 * setPageLoading : 提供設定載入狀態接口  
 * runPageLoading : 直接啟用載入狀態  
 * stopPageLoading : 直接停用載入狀態
 */
const usePageLoading = (initialPageLoading) => {
    const [isPageLoading, setPageLoading] = useState(initialPageLoading ?? false);

    const [pageLoading] = useState(() => {
        const container = document.createElement('div');
        container.classList.add('loader-overlay');
        const content = document.createElement('div');
        content.classList.add('spinner-border');
        container.appendChild(content);
        return container;
    });

    /**
     * 開始載入頁面
     */
    const runPageLoading = useCallback(() => {
        // 檢查是否有授權，會回傳 true 或 false
        checkAuth();
        setPageLoading(true);
        sessionStorage.setItem("countDownTime", new Date().getTime());
    }, []);

    /**
     * 停止載入頁面
     * 並將當前時間存入 sessionStorage，用以記錄登出時間
     */
    const stopPageLoading = useCallback(() => {
        setPageLoading(false);
    }, []);

    useEffect(() => {
        if (isPageLoading) {
            document.body.appendChild(pageLoading);
        }
        return () => {
            if (pageLoading.parentNode === document.body) {
                document.body.removeChild(pageLoading);
            }
        };
    }, [isPageLoading, pageLoading]);

    return {
        isPageLoading,
        setPageLoading,
        runPageLoading,
        stopPageLoading
    };
};

export default usePageLoading;