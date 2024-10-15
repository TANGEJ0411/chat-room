import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function ChatInput({formState, handleChange, addMessage, callAiModels}) {

  const handleSend = useCallback((e) => {
    e.preventDefault();
    const {inputs: {
      message: {
        value: message,
      },
    }} = formState;
    if (message) {
      addMessage(message, 'user');
    }
    handleChange('message', '');

    callAiModels(message);
  },[formState, handleChange, callAiModels, addMessage]);

  return (
    <div className="position-fixed bottom-0 w-100 p-3 bg-light">
      <form className="input-group" onSubmit={handleSend}>
        <input
          value={formState.inputs.message.value}
          onChange={handleChange}
          name='message'
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
  formState: PropTypes.object,
  handleChange: PropTypes.func,
  addMessage: PropTypes.func,
  callAiModels: PropTypes.func,
};

export default ChatInput;