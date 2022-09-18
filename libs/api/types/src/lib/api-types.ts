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

export interface FormDefinition<T> {
  id: string;
  name: string;
  description?: string;
  questions: T;
}

export type GetFormDefinitionResponse = FormDefinition<Array<FormQuestion>>;

export type CreateFormDefinitionQuestion = Omit<FormQuestion, 'id'>;

export type CreateFormDefinition = Omit<
  FormDefinition<Array<CreateFormDefinitionQuestion>>,
  'id'
>;

export interface FormEntryAnswer {
  id: string;
  answer: string;
  question: FormQuestion;
}

export interface FormEntry<T> {
  id: string;
  answers: T;
}

export type CreateFormEntryAnswer = Omit<FormEntryAnswer, 'id' | 'question'> & {
  questionId: string;
  answerType: FormQuestionAnswerType;
};

export type CreateFormEntry = Omit<
  FormEntry<Array<CreateFormEntryAnswer>>,
  'id'
>;

export type FormEntryReponseData = FormEntry<Array<FormEntryAnswer>>;

export interface ListFormEntriesResponseData {
  formName: string;
  entries: [FormEntryReponseData[], number];
}

export type ListFormEntriesResponse = ListFormEntriesResponseData;

export type GetFormEntryResponse = FormEntryReponseData & {
  formDefinition: Omit<FormDefinition<Array<FormQuestion>>, 'questions'>;
};
