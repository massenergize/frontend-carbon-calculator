import firebase, {
  googleProvider,
  facebookProvider,
} from '../../config/firebaseConfig'

export const sendEmailVerification = ({ callback, onError }) => {
  try {
    firebase.auth().currentUser.sendEmailVerification()
  } catch (err) {
    onError(err)
  } finally {
    callback(false)
  }
}

export const signInWithGoogle = ({ onSignInSuccess, onError }) => {
  // Authentication reset upon closing tab/window
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then(async googleAuth => {
          await onSignInSuccess(googleAuth)
        })
        .catch(err => {
          onError(err)
        })
    })
}
// Sign In with Facebook function
export const signInWithFacebook = ({ onSignInSuccess, onError }) => {
  // Authentication reset upon closing tab/window
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then(async facebookAuth => {
          await onSignInSuccess(facebookAuth)
        })
        .catch(err => {
          onError(err)
        })
    })
}

// Sign in with email and password function
export const normalSignIn = (
  { email, password },
  { onSignInSuccess, onError },
) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async res => {
      await onSignInSuccess(res)
    })
    .catch(err => {
      onError(err)
    })
}

export const firebaseSignUp = (
  { email, password },
  { onAuthSucess, onError },
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async res => {
      await onAuthSucess(res)
    })
    .catch(err => {
      onError(err)
    })
}

export const sendResetPasswordEmail = (
  { email },
  { onEmailSentSuccess, onError },
) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function() {
      onEmailSentSuccess()
    })
    .catch(function(error) {
      onError(error)
    })
}
