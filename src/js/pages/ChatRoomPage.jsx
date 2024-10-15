import React, { useEffect, useState } from 'react';
import ChatRoomBar from '../common/views/ChatRoomBar';
import ChatInput from '../common/views/ChatInput';
import ChatBubble from '../common/views/ChatBubble';

function ChatRoomPage() {

  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    const msgContainer = document.querySelector('.msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, [msgList]);

  return (
    <div>
      <ChatRoomBar />
      <div className='msg-container'>
        {msgList.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <ChatInput setMsgList={setMsgList}/>
    </div>
  );
}

export default ChatRoomPage;