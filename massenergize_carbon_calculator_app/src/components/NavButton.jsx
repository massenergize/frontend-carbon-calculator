import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import CustomizedButton from './CustomizedButton'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#8dc63f',
    fontWeight: 'bold',
    width: '100%',
  },
})

const NavButton = ({ href, onClick, children }) => {
  const classes = useStyles()
  if (href) {
    return (
      <NavLink to={href} className={classes.link}>
        <CustomizedButton>{children}</CustomizedButton>
      </NavLink>
    )
  }
  return <CustomizedButton onClick={onClick}>{children}</CustomizedButton>
}

NavButton.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default NavButton
