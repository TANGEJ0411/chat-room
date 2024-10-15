import React from 'react';
import PropTypes from 'prop-types';
import {USER_TYPE} from '../utils/type';

function ChatBubble({text, type}) {
  return (
    <p className={`chat-bubble p-2 rounded-2 my-2 mx-2 ${type === USER_TYPE.USER ? 'user bg-primary text-light' : 'bot bg-light'}`}>{text}</p>
  );
}

ChatBubble.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default ChatBubble;