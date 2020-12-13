import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  signInWithGoogle,
  signInWithFacebook,
} from '../../actions/firebaseAuth'

const providers = {
  google: {
    onClick: signInWithGoogle,
  },
  facebook: {
    onClick: signInWithFacebook,
  },
}

const useStyles = makeStyles({})

const OAuthOptions = ({ providerName }) => {
  const classes = useStyles()
  return (
    <Grid item>
      <Button
        onClick={providers[providerName].onClick}
        id={`${providerName}`}
        className={`img-circle ${providerName} ${
          classes[`${providerName}Btn`]
        }`}
      >
        <span
          className={`fa fa-${providerName}-f`}
        >{`Continue with ${providers[providerName]}`}</span>
      </Button>
    </Grid>
  )
}

OAuthOptions.propTypes = {
  providerName: PropTypes.string,
}

export default OAuthOptions
