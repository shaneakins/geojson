import { CSSProperties } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import FieldErrorMessage from './FieldErrorMessage'
import Field from './Field'
import { isLatValid, isLongValid } from '../../utils'

import { UserSubmitFormShort } from '../../types'

type Props = {
  submitData: SubmitHandler<UserSubmitFormShort>
}

const style: CSSProperties = {
  color: 'red',
  fontSize: '10pt',
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
            Latitude must be between -90 and 90
          </FieldErrorMessage>
        )}
        {errors.lat && errors.lat.message && (
          <FieldErrorMessage>Please enter a latitude</FieldErrorMessage>
        )}
      </div>
      <div>
        <Field
          label='Longitiude'
          name='lng'
          register={register}
          required
          validate={isLongValid}
        />
        {errors.lng && errors.lng.type === 'validate' && (
          <FieldErrorMessage>
            Longitude must be between -180 and 180
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
