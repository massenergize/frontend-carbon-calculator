import React from 'react'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core'
import Link from './Link'

const useStyles = makeStyles({
  menuButton: {
    marginRight: 20,
    color: '#8dc63f',
  },
  menuIcon: { width: '5vw', height: '5vh', margin: '0' },
  list: {
    width: '250px',
  },
  button: {
    backgroundColor: 'inherit',
    marginRight: '20px',
    '&:hover': {
      backgroundColor: '#7aab37',
      borderColor: '#6d9931',
      boxShadow: 'none',
      '& a': {
        color: '#fff',
      },
    },
  },
})

const NavList = ({ routes }) => {
  const classes = useStyles()
  return (
    <List>
      {routes.map(route => (
        <ListItem button key={route} className={classes.button}>
          <Link color="#67b6e4" fontWeight="bold" width="100%" route={route}>
            <ListItemText primary={startCase(route)} />
          </Link>
        </ListItem>
      ))}
    </List>
  )
}

NavList.propTypes = {
  routes: PropTypes.array,
}

export default NavList
