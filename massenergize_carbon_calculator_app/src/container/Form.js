import React from 'react'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import Component from '../components/Form'

const Form = ({
  Fields,
  initialValues,
  onSubmit,
  validateSchema,
  error,
  ...rest
}) => {
  const FormFormik = useFormik({
    initialValues,
    onSubmit,
    validateSchema,
  })
  return (
    <Component
      status={FormFormik.status || error}
      onSubmit={FormFormik.handleSubmit}
      {...rest}
    >
      <Fields formik={FormFormik} />
    </Component>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  validateSchema: PropTypes.any,
  Fields: PropTypes.any,
  error: PropTypes.any,
  loading: PropTypes.bool,
}

export default Form
