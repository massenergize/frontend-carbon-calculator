import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HeaderButton from './HeaderButton'
import Link from './Link'
import LoadingSpinner from './LoadingSpinner'
import TemporaryLeftDrawer from './TemporaryLeftDrawer'

// Styling classes definition
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'inherit',
    marginRight: 20,
    '&:hover': {
      backgroundColor: '#7aab37',
      borderColor: '#6d9931',
      boxShadow: 'none',
      '& a': {
        color: '#fff',
      },
    },
  },
  logo: {
    '& img': {
      width: '80px',
    },
    '& img::hover': {
      opacity: 0.1,
    },
    margin: '1vh',
  },
  link: {
    textDecoration: 'none',
    color: '#8dc63f',
    fontWeight: 'bold',
    width: '100%',
  },
  headerTitle: {
    color: '#b2d9f1',
    fontWeight: 'bold',
  },
  rightPositioned: {
    position: 'absolute',
    right: 0,
    display: 'inline-block',
    marginRight: 20,
  },
})

const Header = ({
  loading,
  drawerRoutes,
  logoLink,
  onSignOut,
  signInNav,
  title,
  showLogin,
}) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = value => () => {
    setIsOpen(value)
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar display="flex" position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            className={classes.menuButton}
            aria-label="open drawer"
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <Typography variant="h6" className={classes.logo}>
            <Link route={logoLink}>
              <img
                src={`${process.env.PUBLIC_URL}/favicon.ico`}
                alt="Cooler Communities banner"
              />
            </Link>
          </Typography>
          <Typography className={classes.headerTitle} variant="h4">
            {title}
          </Typography>
          {/* {showLogin && ( */}
          <div className={classes.rightPositioned}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <HeaderButton signInNav={signInNav} onSignOut={onSignOut} />
            )}
          </div>
          {/* )} */}
        </Toolbar>
      </AppBar>
      <TemporaryLeftDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        drawerRoutes={drawerRoutes}
      />
    </div>
  )
}

Header.propTypes = {
  loading: PropTypes.bool,
  drawerRoutes: PropTypes.arrayOf(PropTypes.string),
  logoLink: PropTypes.string,
  onSignOut: PropTypes.func,
  signInNav: PropTypes.func,
  title: PropTypes.string,
  showLogin: PropTypes.bool,
}

export default Header
