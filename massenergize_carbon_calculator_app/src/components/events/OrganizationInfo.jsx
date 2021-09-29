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
    color: '#8dc63f',
  },
})

const OrganizationInfo = ({
  title,
  name,
  url,
  logo,
  contact,
  email,
  phone,
}) => {
  const classes = useStyles()
  return (
    <Grid item>
      <Grid item container>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <Grid item container direction="row">
          <MyCard title={name} image={logo?.url} imageAlt={name} imageUrl={url}>
            {contact && (
              <Typography variant="h6" component="h2">
                {contact}
              </Typography>
            )}
            {email && (
              <IconButton>
                <a href={`mailto:${email}`}>
                  <EmailIcon />
                </a>
              </IconButton>
            )}
            {phone && (
              <IconButton>
                <a href={`tel:${phone}`}>
                  <PhoneIcon />
                </a>
              </IconButton>
            )}
          </MyCard>
        </Grid>
      </Grid>
    </Grid>
  )
}

OrganizationInfo.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  logo: PropTypes.object,
  contact: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
}

export default OrganizationInfo
