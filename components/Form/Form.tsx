import { useForm, SubmitHandler } from 'react-hook-form'
import FieldErrorMessage from './FieldErrorMessage'
import Field from './Field'
import { isLatValid, isLongValid } from '../../utils/utils'
import { VALID_RANGE } from '../../utils/constants'
import { UserSubmitFormShort } from 'types/'

type Props = {
  submitData: SubmitHandler<UserSubmitFormShort>
}

const Form = ({ submitData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitFormShort>()

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <div>
        <Field
          label='Latitude'
          name='lat'
          register={register}
          required
          validate={isLatValid}
        />
        {errors.lat && errors.lat.type === 'validate' && (
          <FieldErrorMessage>
            {`Latitude must be between ${VALID_RANGE.MIN_LAT} and ${VALID_RANGE.MAX_LAT}`}
          </FieldErrorMessage>
        )}
        {errors.lat && errors.lat.message && (
          <FieldErrorMessage>Please enter a latitude</FieldErrorMessage>
        )}
      </div>
      <div>
        <Field
          label='Longitude'
          name='lng'
          register={register}
          required
          validate={isLongValid}
        />
        {errors.lng && errors.lng.type === 'validate' && (
          <FieldErrorMessage>
            {`Longitude must be between ${VALID_RANGE.MIN_LNG} and ${VALID_RANGE.MAX_LNG}`}
          </FieldErrorMessage>
        )}
        {errors.lng && errors.lng.message && (
          <FieldErrorMessage>Please enter a longitude</FieldErrorMessage>
        )}
      </div>
      <input type='submit' value='Plot' />
    </form>
  )
}

export default Form
