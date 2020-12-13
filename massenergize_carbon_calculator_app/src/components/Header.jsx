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
import CustomizedButton from './CustomizedButton'
import AuthIsLoaded from '../container/AuthIsLoadContainer'

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
    '& > li': {
      display: 'inline-block',
    },
  },
  active: {
    textDecoration: 'underline',
    color: '#65B4E4',
  },
  navItem: {
    padding: '10px',
    marginRight: '20px',
  },
  logo: {
    '& img': {
      width: '80px',
    },
    '& img::hover': {
      opacity: 0.1,
    },
    width: '80px',
    height: '80px',
    margin: '1vh',
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
  routes,
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
              <ul className={classes.nav}>
                {routes.map(
                  ({ path, name }) =>
                    name && (
                      <li key={path} className={classes.navItem}>
                        <Link route={path} activeClassName={classes.active}>
                          <CustomizedButton>{startCase(name)}</CustomizedButton>
                        </Link>
                      </li>
                    ),
                )}
                {showLogin && (
                  <li className={classes.navItem}>
                    <AuthIsLoaded>
                      <AuthButton
                        signInNav={signInNav}
                        loading={loading}
                        onSignOut={onSignOut}
                      />
                    </AuthIsLoaded>
                  </li>
                )}
              </ul>
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
          routes={routes}
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
  routes: PropTypes.array,
  logoLink: PropTypes.string,
  onSignOut: PropTypes.func,
  signInNav: PropTypes.func,
  title: PropTypes.string,
  showLogin: PropTypes.bool,
}

export default Header
