import React, { useCallback, useEffect, useReducer } from 'react';
import ChatRoomBar from '../common/views/ChatRoomBar';
import ChatInput from '../common/views/ChatInput';
import ChatBubble from '../common/views/ChatBubble';
import useForm from '../common/hooks/useForm';
import axios from 'axios';

const modelMap = [
  { name: "openAiSimple", url: "simple/openAI" },
  { name: "ollamaSimple", url: "simple/ollama" },
  { name: "openAiAssistant", url: "assistant/openAI" },
  { name: "ollamaAssistant", url: "assistant/ollama" },
  { name: "ollaopenAiRagmaRag", url: "rag/openAI" },
  { name: "ollamaRag", url: "rag/ollama" },
];

const initialState = {
  openAiSimple: [],
  ollamaSimple: [],
  openAiAssistant: [],
  ollamaAssistant: [],
  openAiRag: [],
  ollamaRag: [],
  msgList: [],
};

const initialFormData = {
  aiType: {value: 'openAiSimple', errorMessage: ''},
  message: {value: '', errorMessage: ''},
};

function ChatRoomPage() {

  const [formState, inputHandler] = useForm(initialFormData);

  // 狀態變化處理函數
  const rHandler = {
    SET_MEMORY_MSG_LIST: (state, action) => {
        return {
            ...state,
            [action.aiType]: action.memoryMsgList,
        };
    },
    SET_MSG_LIST: (state, action) => {
        return {
            ...state,
            msgList: action.msgList,
        };
    }
  };
  // 狀態更新函數
  const reducer = (state, action) => (
      // 根據接收到的操作類型，決定對應的狀態變化處理函數
      rHandler[action.type] ? rHandler[action.type](state, action) : state
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  // 輸入框變化處理
  const handleChange = useCallback((obj, value) => {
    if(obj && (value || value === '')){
        inputHandler(obj, value);
    }
    else if(obj && obj.target){
        const {target: {name, value}} = obj;
        inputHandler(name, value);
    }
  }, [inputHandler]);

  const switchAiType = useCallback((e) => {
    handleChange(e);
    dispatch({type: 'SET_MSG_LIST', msgList: state[e.target.value]});
  }, [handleChange, state]);

  const addMessage = useCallback((msg, type) => {
    dispatch({
      type: 'SET_MSG_LIST', 
      msgList: [...state.msgList, {text: msg, type: type}]
    });
    dispatch({
      type: 'SET_MEMORY_MSG_LIST', 
      aiType: formState.inputs.aiType.value, 
      memoryMsgList: [...state[formState.inputs.aiType.value], {text: msg, type: type}]
    });
    
  }, [formState.inputs.aiType.value, state]);

  const callAiModels = useCallback(async (msg) => {
    const aiType = formState.inputs.aiType.value;
    const url = modelMap.find(model => model.name === aiType).url;
    try {
      const response = await axios.post(`http://localhost:8080/model/${url}`, {
        msg: msg, // 或者簡寫成 msg,
      });
      const data = await response.json();
      console.log(data);
      addMessage(data.message, 'bot');
      // return data;
    } catch (error) {
      console.error('Error:', error);
      addMessage(`something went wrong. there is no response from model.${error}`, 'bot');
    }
  }, [addMessage, formState.inputs.aiType.value]);

  useEffect(() => {
    const msgContainer = document.querySelector('.msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, [state.msgList]);

  return (
    <div>
      <ChatRoomBar formState={formState} switchAiType={switchAiType} modelMap={modelMap}/>
      <div className='msg-container'>
        {state.msgList.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <ChatInput formState={formState} handleChange={handleChange} addMessage={addMessage} callAiModels={callAiModels}/>
    </div>
  );
}

export default ChatRoomPage;