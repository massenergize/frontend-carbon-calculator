import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Container as MUContainer } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    fontSize: '1vh',
    marginTop: '20px',
    marginBottom: '20px',
  },
  container: {
    backgroundColor: 'white',
  },
})

const Container = ({ children, title }) => {
  const classes = useStyles()
  return (
    <MUContainer maxWidth="lg" className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item>{title}</Grid>
        <Grid container item xs={12}>
          {children}
        </Grid>
      </Grid>
    </MUContainer>
  )
}

Container.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default Container
