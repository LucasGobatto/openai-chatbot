import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ChatPage } from './pages';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  }
]);
