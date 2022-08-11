import { useForm } from 'react-hook-form';

export default function useConfirmAndSignTransactionForm({ broadcastTransactionMutation }) {
  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      password: ''
    }
  });

  const handleSubmit = baseHandleSubmit((values) => {
    console.log({ values });

    // Run sign TX process

    broadcastTransactionMutation.mutate(
      { transaction: '123lk1j23lk12j3l12kj3' },
      {
        onSuccess: (data) => console.log({ data }),
        onError: (error) => console.log({ error })
      }
    );
  });

  return { ...form, handleSubmit };
}
