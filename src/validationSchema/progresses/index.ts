import * as yup from 'yup';

export const progressValidationSchema = yup.object().shape({
  progress_details: yup.string().required(),
  senior_user_id: yup.string().nullable(),
  health_plan_id: yup.string().nullable(),
});
