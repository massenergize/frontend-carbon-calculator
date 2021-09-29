import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  link: props => ({
    ...props,
    textDecoration: 'none',
  }),
})

const LinkComponent = ({
  route,
  className,
  children,
  activeClassName,
  ...stylesProps
}) => {
  const classes = useStyles(stylesProps)

  return (
    <NavLink
      to={`${route === 'home' ? '' : route}`}
      className={`${classes.link} ${className}`}
      activeClassName={activeClassName}
    >
      {children}
    </NavLink>
  )
}

LinkComponent.propTypes = {
  route: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  activeClassName: PropTypes.any,
}

export default LinkComponent
