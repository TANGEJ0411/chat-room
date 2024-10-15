import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './js/common/components/error/ErrorBoundary';
import './js/common/style/globalStyle.scss';
import ChatRoomPage from './js/pages/ChatRoomPage';

const root = createRoot(document.getElementById('root'));

function App() {
  return (
      <ErrorBoundary>
        <ChatRoomPage />
      </ErrorBoundary>
  );
}

root.render(<App />);