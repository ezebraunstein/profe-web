import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import TextInput from './TextInput';
import TextAreaInput from './TextAreaInput';
import SubmitInput from './SubmitInput';
import Checkbox from "./Checkbox";
import { Course } from "@prisma/client";

export type Inputs = {
  name: string;
  description: string;
  published: boolean;
};

type Props = {
  course?: Course;
  onSubmit: SubmitHandler<Inputs>;
  isLoading: boolean;
}

const CourseForm = ({ course, onSubmit, isLoading }: Props) => {
  const methods = useForm<Inputs>({
    defaultValues: {
      name: course?.name,
      description: course?.description,
      published: course?.published || false
    }
  });

  return (
    <FormProvider {...methods}>
      <form className='flex flex-col max-w-lg' onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput label='Nombre' name='name' options={{ required: true }} />
        <TextAreaInput label='Descripción' name='description' options={{ required: true }} />
        {course && <Checkbox label="Publicar" name="published" />}
        <SubmitInput value={`${course ? 'Actualizar' : 'Crear'} curso`} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}

export default CourseForm;