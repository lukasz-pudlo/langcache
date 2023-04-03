import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddPhrase } from './AddPhrase';
import DisplayTranslations from './DisplayTranslations';

const mockFetchMeaningFromDuden = jest.fn();

beforeEach(() => {
  AddPhrase.fetchMeaningFromDuden = mockFetchMeaningFromDuden;
});

test('fetches meaning from Duden when the source language is changed to German', async () => {
  render(<DisplayTranslations />);

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

  // Check if the function was called with the correct word
  expect(mockFetchMeaningFromDuden).toHaveBeenCalledWith('Freiheit');
});
