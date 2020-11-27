import React from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import NavList from './NavList'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})

const TemporaryLeftDrawer = ({ toggleDrawer, isOpen, drawerRoutes }) => {
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
        <NavList routes={drawerRoutes} toggleDrawer={toggleDrawer} />
      </div>
    </Drawer>
  )
}

TemporaryLeftDrawer.propTypes = {
  toggleDrawer: PropTypes.func,
  isOpen: PropTypes.bool,
  drawerRoutes: PropTypes.arrayOf(PropTypes.string),
}

export default TemporaryLeftDrawer
