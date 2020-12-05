import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Hidden,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { startCase } from 'lodash'
import AuthButton from './auth/AuthButton'
import Link from './Link'
import TemporaryLeftDrawer from './TemporaryLeftDrawer'

// Styling classes definition
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #cfcfcf',
  },
  nav: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '20px',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
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
    display: 'inline-flex',
    marginRight: 20,
    alignItems: 'center',
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
  isDrawerOpen,
  toggleDrawer,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar display="flex" position="static" className={classes.appBar}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              onClick={toggleDrawer(true)}
              className={classes.menuButton}
              aria-label="open drawer"
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          </Hidden>
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
          <div className={classes.rightPositioned}>
            <Hidden mdDown>
              {drawerRoutes.map(route => (
                <Link
                  key={route}
                  className={classes.nav}
                  color="#67b6e4"
                  fontWeight="bold"
                  width="100%"
                  route={route}
                >
                  {startCase(route)}
                </Link>
              ))}
              {showLogin && (
                <AuthButton
                  signInNav={signInNav}
                  loading={loading}
                  onSignOut={onSignOut}
                />
              )}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <TemporaryLeftDrawer
          signInNav={signInNav}
          onSignOut={onSignOut}
          isOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          drawerRoutes={drawerRoutes}
          showLogin={showLogin}
          loading={loading}
        />
      </Hidden>
    </div>
  )
}

Header.propTypes = {
  loading: PropTypes.bool,
  isDrawerOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  drawerRoutes: PropTypes.arrayOf(PropTypes.string),
  logoLink: PropTypes.string,
  onSignOut: PropTypes.func,
  signInNav: PropTypes.func,
  title: PropTypes.string,
  showLogin: PropTypes.bool,
}

export default Header
