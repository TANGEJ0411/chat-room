import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

function ChatInput({formState, handleChange, callAiModels, messageRef, setMsgList}) {

  const handleSend = useCallback((e) => {
    e.preventDefault();
    const {inputs: {
      message: {
        value: message,
      },
      aiType: {
        value: aiType,
      }
    }} = formState;
    if (message) {
      messageRef.current[aiType].push({text: message, type: 'user'});
      console.log(messageRef.current);
      console.log(messageRef.current[aiType]);
      
      setMsgList([...messageRef.current[aiType]]);
    }
    handleChange('message', '');

    callAiModels(message);
  },[formState, handleChange, callAiModels, messageRef, setMsgList]);

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
  messageRef: PropTypes.object,
  setMsgList: PropTypes.func,
};

export default ChatInput;