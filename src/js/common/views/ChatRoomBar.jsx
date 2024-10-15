import { mdiReact } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import { COLOR } from '../utils/type';

function ChatRoomBar() {
  return (
    <nav className="d-flex justify-content-between align-items-center position-fixed top-0 p-2 w-100 border border-bottom">
        <div className="d-flex align-items-center">
            <div className="bg-primary d-flex align-items-center justify-content-center p-2 rounded-2">
                <Icon path={mdiReact} size={2} color={COLOR.colorWhite}/>
            </div>
            <div className="ms-2">
                <h6 className="mb-0">Chat Room</h6>
                <select>
                    <option value="open_ai_simple">open ai simple</option>
                    <option value="ollama_simple">ollama simple</option>
                    <option value="open_ai_assistant">open ai assistant</option>
                    <option value="ollama_assistant">ollama assistant</option>
                    <option value="open_ai_rag">open ai rag</option>
                    <option value="ollama_rag">ollama rag</option>
                </select>
            </div>
        </div>
        <div className='avatar-box d-flex align-items-center'>
            <img src={`${process.env.PUBLIC_URL}/image/head.jpg`} alt="Head" />
        </div>
    </nav>
  );
}

export default ChatRoomBar;