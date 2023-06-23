import { ProgressInterface } from 'interfaces/progress';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HealthPlanInterface {
  id?: string;
  senior_user_id?: string;
  health_coach_id?: string;
  plan_details: string;
  created_at?: any;
  updated_at?: any;
  progress?: ProgressInterface[];
  user_health_plan_senior_user_idTouser?: UserInterface;
  user_health_plan_health_coach_idTouser?: UserInterface;
  _count?: {
    progress?: number;
  };
}

export interface HealthPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  senior_user_id?: string;
  health_coach_id?: string;
  plan_details?: string;
}
