import { createBrowserRouter } from 'react-router-dom';
import { RouteGuard } from './guard';
import { ChatPage, HomePage, ReportsPage } from './pages';
import { DeviceIdProvider } from './providers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/chat',
    element: (
      <RouteGuard>
        <DeviceIdProvider>
          <ChatPage />
        </DeviceIdProvider>
      </RouteGuard>
    ),
  },
  {
    path: '/reports',
    element: <ReportsPage />,
  },
]);
