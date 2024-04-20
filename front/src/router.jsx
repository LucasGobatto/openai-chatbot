import { createBrowserRouter } from 'react-router-dom';
import { HomePage, ChatPage } from './pages';
import { RouteGuard } from './guard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: (
      <RouteGuard>
        <ChatPage />
      </RouteGuard>
    ),
  },
]);
