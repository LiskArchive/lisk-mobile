import { useForm } from 'react-hook-form';

export default function useConfirmAndSignTransactionForm() {
  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      password: ''
    }
  });

  const handleSubmit = baseHandleSubmit((values) => {
    console.log({ values });
  });

  return { ...form, handleSubmit };
}
