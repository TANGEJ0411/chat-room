import { mdiAlertOctagon, mdiCheckCircle } from '@mdi/js';
import { useCallback } from 'react';
import { COLOR } from '../utils/type';

/**
 * 
 * @param {object} openModal - 開啟 Modal 的 function
 * @param {object} closeModal - 關閉 Modal 的 function
 * @returns {function} copy - 複製文字
 */
const useCopy = ({ openModal, closeModal }) => {

  const reClick = useCallback((cancel) => {
    if (cancel) {
        closeModal();
    }
    closeModal();
  }, [closeModal]);

  const copy = useCallback((text) => {
    if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
            openModal({
                content: '複製成功',
                type: mdiCheckCircle,
                color: COLOR.colorSuccess,
                cancel: false,
                reClick
            });
        })
        .catch(err => {
          console.error('複製失敗:', err);
          openModal({
                content: '複製失敗',
                type: mdiAlertOctagon,
                color: COLOR.colorFail,
                cancel: false,
                reClick
          });
        });
    }
  }, [openModal, reClick]);

  return { copy };
};

export default useCopy;