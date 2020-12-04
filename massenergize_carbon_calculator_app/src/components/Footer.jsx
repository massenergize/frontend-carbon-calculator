import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
})

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <footer>Footer</footer>
    </div>
  )
}

export default Footer
