import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Container from '../Container'

const useStyles = makeStyles({
  title: {
    fontSize: '20px',
    fontWeight: 600,
  },
  container: {
    padding: '20px',
  },
  content: {
    fontSize: '16px',
    color: 'gray',
  },
})

const HomePage = ({ paragraphContent }) => {
  const classes = useStyles()
  return (
    <Container
      title={
        <Typography variant="h2" className={classes.title}>
          About the CarbonSaver
        </Typography>
      }
      wrapperClassName={classes.container}
    >
      <div className="community-about-text cool-font">{paragraphContent}</div>
    </Container>
  )
}

HomePage.propTypes = {
  paragraphContent: PropTypes.string,
}

export default HomePage
