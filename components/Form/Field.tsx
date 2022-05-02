import { FieldTypes } from 'types/'

const Field = ({ label, name, register, required, validate }: FieldTypes) => (
  <label>
    <input
      type='text'
      placeholder={label}
      {...register(name, { required: ' This is required', validate })}
    />
  </label>
)

export default Field
