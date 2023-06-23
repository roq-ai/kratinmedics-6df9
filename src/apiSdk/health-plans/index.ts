import axios from 'axios';
import queryString from 'query-string';
import { HealthPlanInterface, HealthPlanGetQueryInterface } from 'interfaces/health-plan';
import { GetQueryInterface } from '../../interfaces';

export const getHealthPlans = async (query?: HealthPlanGetQueryInterface) => {
  const response = await axios.get(`/api/health-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createHealthPlan = async (healthPlan: HealthPlanInterface) => {
  const response = await axios.post('/api/health-plans', healthPlan);
  return response.data;
};

export const updateHealthPlanById = async (id: string, healthPlan: HealthPlanInterface) => {
  const response = await axios.put(`/api/health-plans/${id}`, healthPlan);
  return response.data;
};

export const getHealthPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/health-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteHealthPlanById = async (id: string) => {
  const response = await axios.delete(`/api/health-plans/${id}`);
  return response.data;
};
