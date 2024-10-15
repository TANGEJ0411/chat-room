import { mdiReact } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { COLOR } from '../utils/type';
import PropTypes from 'prop-types';

function ChatRoomBar({formState, switchAiType, modelMap}) {
    
  return (
    <nav className="d-flex justify-content-between align-items-center position-fixed top-0 p-2 w-100 border border-bottom">
        <div className="d-flex align-items-center">
            <div className="bg-primary d-flex align-items-center justify-content-center p-2 rounded-2">
                <Icon path={mdiReact} size={2} color={COLOR.colorWhite}/>
            </div>
            <div className="ms-2">
                <h6 className="mb-0">Chat Room</h6>
                <select
                    name="aiType"
                    value={formState.inputs.aiType.value}
                    onChange={(e) => {
                        switchAiType(e);
                    }}
                    className="form-select"
                >
                    {modelMap.map((model) => (
                        <option value={model.name} key={model.name}>{model.name}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='avatar-box d-flex align-items-center'>
            <img src={`${process.env.PUBLIC_URL}/image/head.jpg`} alt="Head" />
        </div>
    </nav>
  );
}

ChatRoomBar.propTypes = {
    formState: PropTypes.object,
    switchAiType: PropTypes.func,
    modelMap: PropTypes.array,
};

export default ChatRoomBar;