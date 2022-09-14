export const FormQuestionAnswerTypeEnum = {
  STRING: 'string',
  LOCATION: 'location',
  INTEGER: 'integer',
  DATE: 'date',
  BOOLEAN: 'boolean',
} as const;

export type FormQuestionAnswerType =
  typeof FormQuestionAnswerTypeEnum[keyof typeof FormQuestionAnswerTypeEnum];
