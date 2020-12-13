import React from 'react'
import PropTypes from 'prop-types'
import { Drawer, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavList from './NavList'
import LoadingSpinner from './LoadingSpinner'
import AuthButton from './auth/AuthButton'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

const TemporaryLeftDrawer = ({
  toggleDrawer,
  isOpen,
  routes,
  showLogin,
  loading,
  signInNav,
  onSignOut,
}) => {
  const classes = useStyles()
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <NavList routes={routes} toggleDrawer={toggleDrawer} />
        <ListItem>
          {showLogin && loading ? (
            <LoadingSpinner />
          ) : (
            <AuthButton signInNav={signInNav} onSignOut={onSignOut} />
          )}
        </ListItem>
      </div>
    </Drawer>
  )
}

TemporaryLeftDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
  routes: PropTypes.array,
  showLogin: PropTypes.bool,
  loading: PropTypes.bool,
  signInNav: PropTypes.func,
  onSignOut: PropTypes.func,
}

export default TemporaryLeftDrawer
