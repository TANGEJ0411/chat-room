import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

function ChatInput({setMsgList}) {

  const [message, setMessage] = useState('');

  const handleSend = useCallback((e) => {
    e.preventDefault();
    if (message) {
      setMsgList((prev) => [...prev, {text: message, type: 'user'}]);
      setMessage('');
    }
  },[message, setMsgList]);

  return (
    <div className="position-fixed bottom-0 w-100 p-3 bg-light">
      <form className="input-group" onSubmit={handleSend}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Type a message"
          aria-label="Message input"
        />
        <button className="btn btn-primary" type="button" onClick={handleSend}>
          Send
        </button>
      </form>
    </div>
  );
}

ChatInput.propTypes = {
  setMsgList: PropTypes.func,
};

export default ChatInput;