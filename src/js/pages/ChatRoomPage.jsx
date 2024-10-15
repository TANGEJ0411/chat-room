import React, { useEffect } from 'react';
import ChatRoomBar from '../common/views/ChatRoomBar';
import ChatInput from '../common/views/ChatInput';
import ChatBubble from '../common/views/ChatBubble';

const msgList = [
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!!!!',
    type: 'user',
  },
  {
    text: 'Hi',
    type: 'bot',
  },
  {
    text: 'How are you?',
    type: 'user',
  },
  {
    text: 'I am fine',
    type: 'bot',
  },
  {
    text: 'I am fine',
    type: 'bot',
  },
  {
    text: 'I am fine',
    type: 'bot',
  },
  {
    text: 'that is good',
    type: 'user',
  },
  {
    text: 'that is good',
    type: 'user',
  }
];

function ChatRoomPage() {

  useEffect(() => {
    const msgContainer = document.querySelector('.msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, []);

  return (
    <div>
      <ChatRoomBar />
      <div className='msg-container'>
        {msgList.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatRoomPage;