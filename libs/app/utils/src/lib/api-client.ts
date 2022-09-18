import type {
  CreateFormDefinition,
  CreateFormEntry,
  GetFormDefinitionResponse,
  GetFormEntryResponse,
  ListFormDefinitionsResponse,
  ListFormEntriesResponse,
} from '@credix/api/types';
import axios from 'axios';

if (!process.env['NEXT_PUBLIC_API_URL']) {
  throw Error('NEXT_PUBLIC_API_URL is not set');
}

const httpClient = axios.create({
  baseURL: process.env['NEXT_PUBLIC_API_URL'],
});

export function getFormDefinitions() {
  return httpClient.get<ListFormDefinitionsResponse>('/forms/definitions');
}

export function createFormDefinition(payload: CreateFormDefinition) {
  return httpClient.post('/forms/definitions', payload);
}

export function getFormDefinition(id: string) {
  return httpClient.get<GetFormDefinitionResponse>(`/forms/${id}`);
}

export function createFormDefinitionEntry(
  formId: string,
  payload: CreateFormEntry
) {
  return httpClient.post(`/forms/${formId}/entries`, payload);
}

export function getFormEntries(formId: string) {
  return httpClient.get<ListFormEntriesResponse>(`/forms/${formId}/entries`);
}

export function getFormEntry(formId: string, entryId: string) {
  return httpClient.get<GetFormEntryResponse>(
    `/forms/${formId}/entries/${entryId}`
  );
}
