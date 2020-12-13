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

const AuthForm = ({ fields, ForgotPassButton, ...restProps }) => {
  const classes = useStyles()
  return (
    <Form
      FieldsComponent={({
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
      }) => (
        <Grid className={classes.fieldContainer} container spacing={2}>
          {fields.map(
            ({ type, label, name, Component: FieldComponent, placeholder }) => (
              <Grid key={name} item xs={12}>
                <FieldComponent
                  className={classes.textInput}
                  variant="outlined"
                  name={name}
                  value={values[name]}
                  placeholder={placeholder}
                  label={label}
                  type={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched[name] && errors[name]}
                />
              </Grid>
            ),
          )}
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
}

export default AuthForm
