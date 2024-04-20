import { RouterProvider } from 'react-router-dom';
import { JobVacancyDescriptionProvider } from './providers';
import { router } from './router';

export function App() {
  return (
    <JobVacancyDescriptionProvider>
      <RouterProvider router={router} />
    </JobVacancyDescriptionProvider>
  );
}
