import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddPhrase } from './AddPhrase';
import DisplayTranslations from './DisplayTranslations';
import { server } from '../testServer'; // import the server

beforeAll(() => server.listen()); // start the server before all tests
afterEach(() => server.resetHandlers()); // reset handlers after each test
afterAll(() => server.close()); // close the server after all tests

const mockFetchMeaningFromDuden = jest.fn();

beforeEach(() => {
  AddPhrase.fetchMeaningFromDuden = mockFetchMeaningFromDuden;
});

test('fetches meaning from Duden when the source language is changed to German', async () => {
  render(<DisplayTranslations />);

  fireEvent.click(screen.getByText('Add new translation'));

  // Type a German word into the source phrase input field
  userEvent.type(screen.getByLabelText('Source Phrase:'), 'Freiheit');

  // Wait for the component to update the state and re-render
  await screen.findByDisplayValue('Freiheit');

  // Wait for the German option to be available
  await screen.findByText('German');

  // Select German as the source language
  userEvent.selectOptions(screen.getByLabelText('Source Language:'), ['German']);

  // Wait for the fetchMeaningFromDuden function to be called
  await waitFor(() => {
    expect(screen.getByText('Searching on Duden...')).toBeInTheDocument();
  });

  // Wait for the target phrase to update with the meaning
  await waitFor(() => {
    expect(screen.getByLabelText('Target Phrase:')).toHaveValue(
      'Zustand, in dem jemand von bestimmten persönlichen oder gesellschaftlichen, als Zwang oder Last empfundenen Bindungen oder Verpflichtungen frei ist und sich in seinen Entscheidungen o.\u00a0\u00c4. nicht [mehr] eingeschr\u00e4nkt f\u00fchlt; Unabh\u00e4ngigkeit, Ungebundenheit'
    );
  });
});
