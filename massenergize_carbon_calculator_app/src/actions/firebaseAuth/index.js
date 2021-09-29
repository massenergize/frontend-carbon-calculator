import firebase, {
  firebaseAuth,
  googleProvider,
  facebookProvider,
} from '../../config/firebaseConfig'

export const sendEmailVerification = ({ callback, onError }) => {
  try {
    firebaseAuth.currentUser.sendEmailVerification()
  } catch (err) {
    onError(err)
  } finally {
    callback(false)
  }
}

export const signInWithGoogle = ({ onSignInSuccess, onError }) => {
  // Authentication reset upon closing tab/window
  firebaseAuth
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
  firebaseAuth
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
  firebaseAuth
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
  firebaseAuth
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
  firebaseAuth
    .sendPasswordResetEmail(email)
    .then(function() {
      onEmailSentSuccess()
    })
    .catch(function(error) {
      onError(error)
    })
}

export const handleResetPassword = async ({ actionCode, newPassword }) => {
  try {
    const email = await firebaseAuth.verifyPasswordResetCode(actionCode)
    const response = await firebaseAuth.confirmPasswordReset(email, newPassword)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const handleRecoverByEmail = async ({
  actionCode,
  onSuccess,
  onError,
}) => {
  try {
    const info = await firebaseAuth.checkActionCode(actionCode)
    onSuccess(info.data.email)
    return firebaseAuth.applyActionCode(actionCode)
  } catch (error) {
    onError(error)
  }
}

export const handleVerifyEmail = async ({ actionCode, onSuccess, onError }) => {
  try {
    const response = await firebaseAuth.applyActionCode(actionCode)
    onSuccess(response)
  } catch (error) {
    onError(error)
  }
}
