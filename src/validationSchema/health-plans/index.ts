import * as yup from 'yup';

export const healthPlanValidationSchema = yup.object().shape({
  plan_details: yup.string().required(),
  senior_user_id: yup.string().nullable(),
  health_coach_id: yup.string().nullable(),
});
