import { jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from '../src/pages';
import { JobVacancyDescriptionProvider } from '../src/providers';

test('should render the form on the home page correctly', () => {
  render(<HomePage />);

  expect(screen.getByRole('heading', { name: /job interview assistance/i })).toBeInTheDocument();
  expect(screen.findByRole('form')).toBeInTheDocument();
  expect(screen.getByText('Cargo')).toBeInTheDocument();
  expect(screen.getByText('Descrição da vaga')).toBeInTheDocument();
  expect(screen.getByText('Valores da empresa')).toBeInTheDocument();
  expect(screen.getByRole('button', { value: 'Iniciar' })).toBeInTheDocument();
});

test('should navigate to the chat page when the form is submitted', () => {
  render(
    <JobVacancyDescriptionProvider>
      <HomePage />
    </JobVacancyDescriptionProvider>,
  );

  fireEvent.input(screen.getByLabelText('Cargo'), { target: { value: 'Desenvolvedor de Software Senior' } });
  fireEvent.input(screen.getByLabelText('Descrição da vaga'), {
    target: { value: 'Esta é uma descrição para a vaga.' },
  });
  fireEvent.input(screen.getByLabelText('Valores da empresa'), {
    target: { value: 'Esta é uma descrição dos valores da empresa.' },
  });
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(window.location.pathname).toBe('/chat');
});

test('should display an alert when the form is submitted with missing fields', () => {
  render(<HomePage />);

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios.');
});

test('should get an error if HomePage is not wrapped in JobVacancyDescriptionProvider', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<HomePage />)).toThrowError(
    'useJobVacancyDescription must be used within a JobVacancyDescriptionProvider',
  );

  consoleError.mockRestore();
});
