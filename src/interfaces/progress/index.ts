import { UserInterface } from 'interfaces/user';
import { HealthPlanInterface } from 'interfaces/health-plan';
import { GetQueryInterface } from 'interfaces';

export interface ProgressInterface {
  id?: string;
  senior_user_id?: string;
  health_plan_id?: string;
  progress_details: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  health_plan?: HealthPlanInterface;
  _count?: {};
}

export interface ProgressGetQueryInterface extends GetQueryInterface {
  id?: string;
  senior_user_id?: string;
  health_plan_id?: string;
  progress_details?: string;
}
