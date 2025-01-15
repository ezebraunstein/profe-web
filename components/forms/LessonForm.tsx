import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import TextInput from 'components/forms/TextInput';
import TextAreaInput from 'components/forms/TextAreaInput';
import SubmitInput from 'components/forms/SubmitInput';
import { Lesson } from "@prisma/client";

export type Inputs = {
  name: string;
  description: string;
};

type Props = {
  lesson?: Lesson;
  onSubmit: SubmitHandler<Inputs>;
  isLoading: boolean;
}

const LessonForm = ({ lesson, onSubmit, isLoading }: Props) => {
  const methods = useForm<Inputs>({ defaultValues: { name: lesson?.name, description: lesson?.description } });

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col max-w-lg' onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput label='Nombre' name='name' options={{ required: true }} />
        <TextAreaInput label='Descripción' name='description' options={{ required: true }} />
        <SubmitInput value={`${lesson ? 'Actualizar' : 'Crear'} clase`} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}

export default LessonForm;