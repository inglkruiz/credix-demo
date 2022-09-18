import { render } from '@testing-library/react';

import FormEntryAnswerView from './form-entry-answer-view';

describe('FormEntryAnswerView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FormEntryAnswerView
        entry={{
          id: '52b5c96c-ad95-4aa0-98b5-80f846eab2c0',
          answer: 'Credix.finance',
          question: {
            id: '639b63e8-091e-42cc-be69-13a4366e0296',
            question: 'What is your name?',
            answerType: 'string',
          },
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
