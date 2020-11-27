import React from 'react'
import PropTypes from 'prop-types'
import { useAuthState } from '../context/AuthContext'
import CustomizedButton from './CustomizedButton'

const HeaderButton = ({ onSignOut, signInNav, ...props }) => {
  const { authState } = useAuthState()
  const onClickHandler = authState ? onSignOut : signInNav
  return (
    <CustomizedButton onClick={onClickHandler} {...props}>
      {authState ? 'Sign Out' : 'Sign In'}
    </CustomizedButton>
  )
}

HeaderButton.propTypes = {
  onSignOut: PropTypes.func,
  signInNav: PropTypes.func,
}

export default HeaderButton
