import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  newLogin: yup.string().email().required(),
  repeatLogin: yup.string().email().required(),
})
