import { FormQuestionAnswerType } from './enums/form-question-answer-type.enum';

export interface ListFormDefinitionsResponseData {
  id: string;
  name: string;
  description: string;
  numQuestions: number;
}

export type ListFormDefinitionsResponse = [
  ListFormDefinitionsResponseData[],
  number
];

export interface FormQuestion {
  id: string;
  question: string;
  answerType: FormQuestionAnswerType;
}

export interface FormDefinition<QuestionsType> {
  id: string;
  name: string;
  description?: string;
  questions: QuestionsType;
}

export type GetFormDefinitionResponse = FormDefinition<Array<FormQuestion>>;

export type CreateFormDefinitionQuestion = Omit<FormQuestion, 'id'>;

export type CreateFormDefinition = Omit<
  FormDefinition<Array<CreateFormDefinitionQuestion>>,
  'id'
>;
