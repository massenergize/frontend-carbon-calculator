import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Form from '../../container/Form'

const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
  fieldContainer: {
    marginTop: '20px',
  },
  forgotPassButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const FieldsComponent = ({
  fields,
  values,
  handleBlur,
  handleChange,
  errors,
  touched,
  className,
}) =>
  fields.map(({ type, label, name, Component, placeholder }) => (
    <Grid key={name} item xs={12}>
      <Component
        className={className}
        variant="outlined"
        name={name}
        value={values[name]}
        placeholder={placeholder}
        label={label}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name]}
      />
    </Grid>
  ))

const AuthForm = ({ fields, component, ForgotPassButton, ...restProps }) => {
  const classes = useStyles()
  const Fields = fields ? FieldsComponent : component
  return (
    <Form
      FieldsComponent={formProps => (
        <Grid className={classes.fieldContainer} container spacing={2}>
          <Fields
            className={classes.textInput}
            fields={fields}
            {...formProps}
          />
          {ForgotPassButton && (
            <ForgotPassButton className={classes.forgotPassButton} />
          )}
        </Grid>
      )}
      {...restProps}
    />
  )
}

AuthForm.propTypes = {
  isSignIn: PropTypes.bool,
  fields: PropTypes.array,
  ForgotPassButton: PropTypes.any,
  component: PropTypes.any,
}

export default AuthForm
