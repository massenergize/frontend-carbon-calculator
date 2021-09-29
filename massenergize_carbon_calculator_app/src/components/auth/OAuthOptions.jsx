import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { startCase } from 'lodash'
import {
  signInWithGoogle,
  signInWithFacebook,
} from '../../actions/firebaseAuth'

const providers = {
  google: {
    iconName: 'fa fa-google',
    onClick: signInWithGoogle,
  },
  facebook: {
    iconName: 'fa fa-facebook-f',
    onClick: signInWithFacebook,
  },
}

const useStyles = makeStyles({
  container: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  googleBtn: {
    color: 'white',
    backgroundColor: 'red',
    width: '100%',
    '&:hover': {
      backgroundColor: '#FF6D6B',
    },
  },
  facebookBtn: {
    color: 'white',
    backgroundColor: '#3b5998',
    width: '100%',
    '&:hover': {
      backgroundColor: '#6E8DCC',
    },
  },
  providerIcon: {
    marginRight: 10,
  },
})

const OAuthOptions = ({ providerName }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Button
        onClick={providers[providerName].onClick}
        id={`${providerName}`}
        className={`img-circle ${providerName} ${
          classes[`${providerName}Btn`]
        }`}
      >
        <span
          className={`${providers[providerName].iconName} ${classes.providerIcon}`}
        />
        {`Continue with ${startCase(providerName)}`}
      </Button>
    </div>
  )
}

OAuthOptions.propTypes = {
  providerName: PropTypes.string,
}

export default OAuthOptions
