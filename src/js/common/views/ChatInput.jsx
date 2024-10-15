import React from 'react';

function ChatInput() {
  return (
    <div className="position-fixed bottom-0 w-100 p-3 bg-light">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message"
          aria-label="Message input"
        />
        <button className="btn btn-primary" type="button">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;