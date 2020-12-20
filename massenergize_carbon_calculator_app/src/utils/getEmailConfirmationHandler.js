import {
  handleRecoverByEmail,
  handleResetPassword,
  handleVerifyEmail,
} from '../actions/firebaseAuth'

const EMAIL_CONFIRMATION_TYPE = {
  resetPassword: handleResetPassword,
  verifyEmail: handleVerifyEmail,
  recoverByEmail: handleRecoverByEmail,
}

export default function({ mode, ...rest }) {
  EMAIL_CONFIRMATION_TYPE[mode]({ ...rest })
}
