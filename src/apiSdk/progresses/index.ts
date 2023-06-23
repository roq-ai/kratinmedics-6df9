import axios from 'axios';
import queryString from 'query-string';
import { ProgressInterface, ProgressGetQueryInterface } from 'interfaces/progress';
import { GetQueryInterface } from '../../interfaces';

export const getProgresses = async (query?: ProgressGetQueryInterface) => {
  const response = await axios.get(`/api/progresses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProgress = async (progress: ProgressInterface) => {
  const response = await axios.post('/api/progresses', progress);
  return response.data;
};

export const updateProgressById = async (id: string, progress: ProgressInterface) => {
  const response = await axios.put(`/api/progresses/${id}`, progress);
  return response.data;
};

export const getProgressById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/progresses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteProgressById = async (id: string) => {
  const response = await axios.delete(`/api/progresses/${id}`);
  return response.data;
};
