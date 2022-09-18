import type { FormEntryAnswer } from '@credix/api/types';
import { Typography } from 'antd';
import React from 'react';

// Component shortcuts
const TypographyTitle = Typography.Title;
const TypographyText = Typography.Text;

export type FormEntryViewProps = {
  entry: FormEntryAnswer;
};

export const FormEntryAnswerView: React.FC<FormEntryViewProps> = ({
  entry,
}) => {
  return (
    <React.Fragment>
      <TypographyTitle level={5} className="tw-mt-4">
        {entry.question.question}
      </TypographyTitle>
      <TypographyText>{entry.answer}</TypographyText>
    </React.Fragment>
  );
};

export default FormEntryAnswerView;
