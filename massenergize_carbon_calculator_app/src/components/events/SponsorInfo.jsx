import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MyCard from '../Card'

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    color: '#fa4a21',
  },
  logoImg: { maxWidth: '100%' },
})

const SponsorInfo = ({ name, url, logo, contact, email, phone }) => {
  //const SponsorInfo = ({ sponsorLogo, sponsorName, sponsorUrl }) => {
  const classes = useStyles()
  return (
    // Render Sponsor Info
    <Grid item>
      <Grid item container>
        <Typography
          className={classes.title}
          style={{ color: '#8dc63f' }}
          variant="h5"
        >
          Sponsors
        </Typography>
      </Grid>
      <Grid item container direction="column">
        <Grid item container direction="row">
          <MyCard
            title={name}
            image={logo && logo.url}
            imageUrl={url}
            imageAlt={name}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

SponsorInfo.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  logo: PropTypes.object,
  //sponsorLogo: PropTypes.string,
  //sponsorName: PropTypes.string,
  //sponsorUrl: PropTypes.string,
}

export default SponsorInfo
