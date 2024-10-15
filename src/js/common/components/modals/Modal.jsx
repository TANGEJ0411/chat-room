import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiAlertOctagon } from '@mdi/js';
import Portal from '../Portal'; // 确保路径和导出正确
import { COLOR, ICON_SIZE } from '../../utils/type'; // 确保路径和导出正确

/**
 * 
 * @param {boolean} isShow - 是否顯示
 * @param {string} id - Modal 的 id
 * @param {object} content - Modal 的內容
 * @param {function} handleClose - 關閉 Modal 的 function
 * @returns 
 */
function Modal({ isShow, id, content, handleClose }) {

  return (
    <Portal>
      <BootstrapModal
        className="popupModal"
        id={id !== undefined ? id : 'popupModal'}
        tabIndex="-1"
        show={isShow}
        onHide={handleClose}
        dialogClassName="modal-dialog-centered modal-sm"
      >
            {content.header && (
              <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{content.header}</BootstrapModal.Title>
              </BootstrapModal.Header>
            )}
            <BootstrapModal.Body className='modal-body'>
                <Icon path={content.type || mdiAlertOctagon} size={ICON_SIZE.xlarge} color={content.color || COLOR.colorFail} />
              <p>{content.content}</p>
              <p><strong>{content.userEmail}</strong></p>
            </BootstrapModal.Body>
            <BootstrapModal.Footer>
              <Button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  content?.reClick ? content.reClick(true) : handleClose();
                }}
              >
                <i className="mdi mdi-check-bold"></i> 確定
              </Button>
              {content.cancel && (
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClose}
                >
                  取消
                </Button>
              )}
            </BootstrapModal.Footer>
      </BootstrapModal>
    </Portal>
  );
}

Modal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  id: PropTypes.string,
  content: PropTypes.shape({
    header: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    userEmail: PropTypes.string.isRequired,
    reClick: PropTypes.func,
    cancel: PropTypes.bool,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;