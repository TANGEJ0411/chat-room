import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatRoomBar from '../common/views/ChatRoomBar';
import ChatInput from '../common/views/ChatInput';
import ChatBubble from '../common/views/ChatBubble';
import useForm from '../common/hooks/useForm';
import axios from 'axios';
import usePageLoading from '../common/hooks/usePageLoading';

const modelMap = [
  { name: "openAiSimple", url: "simple/openAI" },
  { name: "ollamaSimple", url: "simple/ollama" },
  { name: "openAiAssistant", url: "assistant/openAI" },
  { name: "ollamaAssistant", url: "assistant/ollama" },
  { name: "openAiRag", url: "rag/openAI" },
  { name: "ollamaRag", url: "rag/ollama" },
];

const initialRef = {
  openAiSimple: [],
  ollamaSimple: [],
  openAiAssistant: [],
  ollamaAssistant: [],
  openAiRag: [],
  ollamaRag: [],
};

const initialFormData = {
  aiType: {value: 'openAiSimple', errorMessage: ''},
  message: {value: '', errorMessage: ''},
};

function ChatRoomPage() {

  const [formState, inputHandler] = useForm(initialFormData);

  const {isPageLoading, runPageLoading, stopPageLoading} = usePageLoading(false, false);

  useEffect(() => {
    console.log('isPageLoading' + isPageLoading);
    
  }, [isPageLoading]);

  const messageRef = useRef(initialRef);

  const [msgList, setMsgList] = useState([]);

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
    setMsgList([...messageRef.current[e.target.value]]);
  }, [handleChange]);

  const callAiModels = useCallback(async (msg) => {
    const aiType = formState.inputs.aiType.value;
    const url = modelMap.find(model => model.name === aiType).url;
    runPageLoading();
    try {
      const response = await axios({
        method: 'POST',
        url: `http://localhost:8080/model/${url}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "messages": msg,
        },
      });
      const data = await response.json();
      console.log(data);
      messageRef.current[aiType].push({text: data.choices[0].message.content, type: 'bot'});
      setMsgList([...messageRef.current[aiType]]);
      stopPageLoading();
      // return data;
    } catch (error) {
      console.error('Error:', error);
      messageRef.current[aiType].push({text: error.message, type: 'bot'});
      setMsgList([...messageRef.current[aiType]]);
      stopPageLoading();
    }
  }, [formState.inputs.aiType.value, runPageLoading, stopPageLoading]);

  useEffect(() => {
    const msgContainer = document.querySelector('.msg-container');
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }, [msgList]);

  return (
    <div>
      <ChatRoomBar formState={formState} switchAiType={switchAiType} modelMap={modelMap}/>
      <div className='msg-container'>
        {msgList.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <ChatInput formState={formState} handleChange={handleChange} callAiModels={callAiModels} messageRef={messageRef} setMsgList={setMsgList} isPageLoading={isPageLoading} />
    </div>
  );
}

export default ChatRoomPage;