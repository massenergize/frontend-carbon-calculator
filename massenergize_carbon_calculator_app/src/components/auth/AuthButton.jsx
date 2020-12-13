import React from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from '../../context/AuthContext'
import NavButton from '../NavButton'
import LoadingSpinner from '../LoadingSpinner'

const AuthButton = ({ onSignOut, loading, signInNav, ...props }) => {
  const { authState } = useAuthState()
  const onClickHandler = authState ? onSignOut : signInNav
  if (loading) return <LoadingSpinner />
  return (
    <NavButton
      href={!authState ? '/auth/signin' : null}
      onClick={onClickHandler}
      {...props}
    >
      {authState ? 'Sign Out' : 'Sign In'}
    </NavButton>
  )
}

AuthButton.propTypes = {
  loading: PropTypes.bool,
  href: PropTypes.string,
  onSignOut: PropTypes.func,
  signInNav: PropTypes.func,
}

export default AuthButton
