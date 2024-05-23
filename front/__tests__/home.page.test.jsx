/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { HomePage } from '../src/pages';
import { JobVacancyDescriptionProvider } from '../src/providers';
import { RenderRoutes } from './render-routes';

test('should render the form on the home page correctly', () => {
  const router = [{ path: '/', element: <HomePage /> }];
  render(<RenderRoutes elements={router} />);

  expect(screen.getByRole('heading', { name: /job interview assistance/i })).toBeInTheDocument();
  expect(screen.getByText('Cargo*')).toBeInTheDocument();
  expect(screen.getByText('Descrição da vaga*')).toBeInTheDocument();
  expect(screen.getByText('Valores da empresa')).toBeInTheDocument();
  expect(screen.getByRole('button', { value: 'Iniciar' })).toBeInTheDocument();
});

test('should navigate to the chat page when the form is submitted', () => {
  const router = [
    {
      path: '/',
      element: (
        <JobVacancyDescriptionProvider>
          <HomePage />
        </JobVacancyDescriptionProvider>
      ),
      index: true,
    },
    { path: '/chat', element: <h1>Chat</h1> },
  ];
  render(<RenderRoutes elements={router} />);

  fireEvent.input(screen.getByPlaceholderText('Desenvolvedor de Softwares Senior'), {
    target: { value: 'Desenvolvedor de Software' },
  });
  fireEvent.input(screen.getByPlaceholderText('Esta é uma descrição para a vaga.'), {
    target: { value: 'Esta é uma descrição para a vaga.' },
  });
  fireEvent.input(screen.getByPlaceholderText('Esta é uma descrição dos valores da empresa.'), {
    target: { value: 'Esta é uma descrição dos valores da empresa.' },
  });
  fireEvent.click(screen.getByRole('button', { value: 'Iniciar' }));

  expect(screen.getByRole('heading', { name: /Chat/i })).toBeInTheDocument();
});

test('should not navigate to chat page if the form is submitted with missing fields', () => {
  const router = [
    {
      path: '/',
      element: (
        <JobVacancyDescriptionProvider>
          <HomePage />
        </JobVacancyDescriptionProvider>
      ),
    },
    { path: '/chat', element: <h1>Chat</h1> },
  ];
  render(<RenderRoutes elements={router} />);

  fireEvent.click(screen.getByRole('button', { value: 'Iniciar' }));

  const chatPage = screen.queryByText('Chat');
  expect(chatPage).toBeNull();
});
