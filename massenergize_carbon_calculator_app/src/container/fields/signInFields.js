import { TextField } from '@material-ui/core'
import * as yup from 'yup'

export default [
  {
    label: 'Email',
    name: 'email',
    Component: TextField,
    validator: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    initialValue: '',
  },
  {
    label: 'Password',
    name: 'password',
    Component: TextField,
    type: 'password',
    validator: yup
      .string('Enter your password')
      .required('Password is required'),
    initialValue: '',
  },
]
