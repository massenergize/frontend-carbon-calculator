import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LoadingSpinner from '../LoadingSpinner'

const useStyles = makeStyles({
  container: {},
  textInput: {},
  submitBtn: {},
  error: {},
  submitBtn: {},
})

const ForgotPass = () => {
  const classes = useStyles()
  return (
  <Paper className={classes.container}>
    <Typography variant="h3">Please Enter Your Email To Continue</Typography>
    {resetPassFormik.status && (
      <Typography className={classes.error}>
        {resetPassFormik.status}
      </Typography>
    )}
    <form noValidate autoComplete="off" onSubmit={resetPassFormik.handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container style={{ marginTop: '2vh' }} spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                placeholder="email@example.com"
                margin="normal"
                className={classes.textInput}
                name="email"
                onBlur={resetPassFormik.handleBlur}
                onChange={resetPassFormik.handleChange}
                value={resetPassFormik.values.email}
                helperText={
                  resetPassFormik.touched.email && resetPassFormik.errors.email
                }
                error={
                  resetPassFormik.touched.email &&
                  !!resetPassFormik.errors.email
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button className={classes.submitBtn} type="submit">
            Continue
          </Button>
          {loading && (
            <LoadingSpinner/>
          )}
        </Grid>
      </Grid>
    </form>
  </Paper>
)
