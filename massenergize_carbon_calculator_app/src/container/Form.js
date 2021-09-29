import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import Component from '../components/Form'

const Form = ({
  FieldsComponent,
  initialValues,
  onSubmit,
  validationSchema,
  validate,
  error,
  ...rest
}) => {
  const FormFormik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validate,
  })
  return (
    <Component
      status={FormFormik.status || error}
      onSubmit={FormFormik.handleSubmit}
      {...rest}
    >
      <FieldsComponent {...FormFormik} />
    </Component>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  validationSchema: PropTypes.any,
  FieldsComponent: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.bool,
  validate: PropTypes.func,
}

export default Form
