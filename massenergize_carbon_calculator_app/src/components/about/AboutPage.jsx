import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Container from '../Container'

const useStyles = makeStyles({
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#65B4E4',
  },
  container: {
    padding: '20px',
  },
  content: {
    fontSize: '16px',
  },
})

const AboutPage = () => {
  const classes = useStyles()
  return (
    <Container
      title={
        <Typography variant="h4" className={classes.title}>
          About MassEnergize
        </Typography>
      }
      wrapperClassName={classes.container}
    >
      <p className={classes.content} style={{ color: 'gray' }}>
        Our mission is to provide communities with the tools and resources to
        motivate and support their residents, businesses and non-profits in a
        wide array of actions to reduce greenhouse gas emissions and prepare for
        a changing climate. We leverage the collective expertise, experience and
        buying power of multiple towns, cities and local organizations by
        collaborating with them on tools, strategies, and resources. This
        community web platform is one example of our work. For more information
        go to <a href="https://www.massenergize.org">www.massenergize.org</a>.
      </p>
    </Container>
  )
}

export default AboutPage
