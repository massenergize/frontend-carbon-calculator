import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, IconButton } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import { makeStyles } from '@material-ui/core/styles'
import MyCard from '../Card'

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    color: '#fa4a21',
  },
})

const HostInfo = ({ name, url, logo, contact, email, phone }) => {
  const classes = useStyles()
  return (
    <Grid item>
      <Grid item container>
        <Typography
          className={classes.title}
          style={{ color: '#8dc63f' }}
          variant="h5"
        >
          About the Host
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <Grid item container direction="row">
          <MyCard title={name} image={logo} imageAlt={name} imageUrl={url}>
            <Typography variant="h5" component="h2">
              {contact}
            </Typography>
            <IconButton>
              <a href={`mailto:${email}`}>
                <EmailIcon />
              </a>
            </IconButton>
            <IconButton>
              <a href={`tel:${phone}`}>
                <PhoneIcon />
              </a>
            </IconButton>
          </MyCard>
        </Grid>
      </Grid>
    </Grid>
  )
}

HostInfo.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  logo: PropTypes.string,
  contact: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
}

export default HostInfo
