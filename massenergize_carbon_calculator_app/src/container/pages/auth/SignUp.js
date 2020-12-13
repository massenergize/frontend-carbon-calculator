// Functional components import
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useFirebase, isEmpty, isLoaded } from 'react-redux-firebase'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
// Styling components import
import {
  Paper,
  TextField,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  facebookProvider,
  googleProvider,
} from '../../../config/firebaseConfig'
import BasicInfo from './BasicInfo'
import { useAuthState } from '../../../context/AuthContext'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { sendEmailVerification } from '../../../actions/firebaseAuth'
import OAuthOptions from '../../../components/auth/OAuthOptions'

// Styling classes
const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
  link: {
    marginLeft: '1vh',
    textDecoration: 'none',
  },
  googleBtn: {
    color: 'white',
    backgroundColor: 'red',
  },
  fbBtn: {
    color: 'white',
    backgroundColor: '#3b5998',
  },
  error: {
    color: 'red',
  },
  submitBtn: {
    backgroundColor: '#8dc63f',
    color: 'white',
  },
})

const SignUpPage = () => {
  const [loading, setLoading] = React.useState(false)
  const firebase = useFirebase()
  const classes = useStyles()
  const auth = useSelector(state => state.firebase.auth)
  const { authState } = useAuthState()

  // On Submit Handler
  const signUp = formValues => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(formValues.email, formValues.passwordOne)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        sendEmailVerification({ setLoading, setError: signUpFormik.setStatus })
      })
      .catch(err => {
        setLoading(false)
        // eslint-disable-next-line no-use-before-define
        signUpFormik.setStatus(err.message)
      })
  }

  const signUpFormik = useFormik({
    initialValues: {
      email: '',
      passwordOne: '',
      passwordTwo: '',
    },
    onSubmit: values => {
      setLoading(true)
      // eslint-disable-next-line no-undef
      signUp(values)
    },

    validate: formValues => {
      const errors = {}

      if (!formValues.email) {
        errors.email = 'You Must Enter an Email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
      ) {
        errors.email = 'Invalid Email'
      }

      if (!formValues.passwordOne) {
        errors.passwordOne = 'You Must Enter a Password'
      }

      if (!formValues.passwordTwo) {
        errors.passwordTow = 'You Must Confirm Your Password'
      }

      if (formValues.passwordTwo !== formValues.passwordOne) {
        errors.passwordTow = 'Your Passwords Are Not Matched'
      }

      return errors
    },
  })

  const signInWithGoogle = () => {
    // Authentication reset upon closing tab/window
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(googleProvider)
          .then(() => {
            // eslint-disable-next-line no-use-before-define
            sendEmailVerification({
              setLoading,
              setError: signUpFormik.setStatus,
            })
          })
          .catch(err => {
            setLoading(false)
            signUpFormik.setStatus(err.message)
          })
      })
  }
  // Sign In with Facebook function
  const signInWithFacebook = () => {
    // Authentication reset upon closing tab/window
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(facebookProvider)
          .then(() => {
            // eslint-disable-next-line no-use-before-define
            sendEmailVerification({
              setLoading,
              setError: signUpFormik.setStatus,
            })
          })
          .catch(err => {
            setLoading(false)
            signUpFormik.setStatus(err.message)
          })
      })
  }
  // Render loading circle when application is loading up data
  if (!isLoaded(auth)) return <LoadingSpinner />

  // Check if user has enter email and password to display message inform he/she of email coming to inbox
  // Allow resend email
  if (!authState && !isEmpty(auth) && !auth.emailVerified) {
    return <Redirect to="/auth/emailsent" />
  }

  if (!authState && !isEmpty(auth) && auth.emailVerified) {
    return <BasicInfo />
  }
  // Prompt user enter authentication info
  return (
    <Paper className={classes.container}>
      <Typography variant="h3">Create Profile</Typography>
      <form noValidate autoComplete="off" onSubmit={signUpFormik.handleSubmit}>
        {signUpFormik.status && (
          <Typography style={{ color: 'red' }}>
            {signUpFormik.status}
          </Typography>
        )}
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
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.email}
                  helperText={
                    signUpFormik.touched.email && signUpFormik.errors.email
                  }
                  error={
                    signUpFormik.touched.email && !!signUpFormik.errors.email
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textInput}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.passwordOne}
                  helperText={
                    signUpFormik.touched.passwordOne &&
                    signUpFormik.errors.passwordOne
                  }
                  error={
                    signUpFormik.touched.passwordOne &&
                    !!signUpFormik.errors.passwordOne
                  }
                  name="passwordOne"
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textInput}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.passwordTwo}
                  helperText={
                    signUpFormik.touched.passwordTwo &&
                    signUpFormik.errors.passwordTwo
                  }
                  error={
                    signUpFormik.touched.passwordTwo &&
                    !!signUpFormik.errors.passwordTwo
                  }
                  name="passwordTwo"
                  label="Confirm Your Password"
                  placeholder="Confirm Your Password"
                  variant="outlined"
                  type="password"
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button className={classes.submitBtn} type="submit">
              Sign In
            </Button>
            {loading && (
              <span>
                <CircularProgress />
              </span>
            )}
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <OAuthOptions />
            <Grid item>
              <Typography>
                Already Have an Account?
                <Link className={classes.link} to="/auth/signin">
                  Sign In
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link className={classes.link} to="/auth/resetpass">
                  Forgot Your Password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
// connect action and styling to current component
export default SignUpPage
