import {
  CreateFormDefinition,
  GetFormDefinitionResponse,
  ListFormDefinitionsResponse,
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
  id: string,
  // TODO: Fix TS type
  payload: Record<string, unknown>
) {
  return httpClient.post(`/forms/${id}/entries`, payload);
}
