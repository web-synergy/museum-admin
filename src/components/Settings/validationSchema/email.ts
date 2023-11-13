import * as yup from 'yup'

const emailRule =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi

export const validationSchema = yup.object().shape({
  newLogin: yup.string().email().matches(emailRule).required(),
  repeatLogin: yup.string().email().required(),
})
