import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProgressById, updateProgressById } from 'apiSdk/progresses';
import { Error } from 'components/error';
import { progressValidationSchema } from 'validationSchema/progresses';
import { ProgressInterface } from 'interfaces/progress';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { HealthPlanInterface } from 'interfaces/health-plan';
import { getUsers } from 'apiSdk/users';
import { getHealthPlans } from 'apiSdk/health-plans';

function ProgressEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProgressInterface>(
    () => (id ? `/progresses/${id}` : null),
    () => getProgressById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProgressInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProgressById(id, values);
      mutate(updated);
      resetForm();
      router.push('/progresses');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProgressInterface>({
    initialValues: data,
    validationSchema: progressValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Progress
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="progress_details" mb="4" isInvalid={!!formik.errors?.progress_details}>
              <FormLabel>Progress Details</FormLabel>
              <Input
                type="text"
                name="progress_details"
                value={formik.values?.progress_details}
                onChange={formik.handleChange}
              />
              {formik.errors.progress_details && <FormErrorMessage>{formik.errors?.progress_details}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'senior_user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<HealthPlanInterface>
              formik={formik}
              name={'health_plan_id'}
              label={'Select Health Plan'}
              placeholder={'Select Health Plan'}
              fetcher={getHealthPlans}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.plan_details}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'progress',
  operation: AccessOperationEnum.UPDATE,
})(ProgressEditPage);
