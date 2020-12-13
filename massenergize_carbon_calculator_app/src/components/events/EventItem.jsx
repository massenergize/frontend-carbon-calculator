import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import Station from '../../container/pages/events/Stations'
import Score from './Score'
import { useSelectedState } from '../../context/SelectedContext'
import OrganizationInfo from './OrganizationInfo'
import AuthIsLoaded from '../../container/AuthIsLoadContainer'

const useStyles = makeStyles({
  root: {
    marginTop: '2vh',
    marginRight: '1vh',
    marginLeft: '1vh',
    padding: '1vh 1vh',
    '& a': {
      textDecoration: 'none',
      color: '#000000',
    },
  },
  hostAndSponsorWrapper: {
    padding: '2vh 2vh',
  },
})

const EventItem = () => {
  const { selected } = useSelectedState()
  const classes = useStyles()
  // eslint-disable-next-line camelcase
  const { host_org, sponsor_org } = selected || {}
  return (
    <AuthIsLoaded>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Grid container spacing={2}>
            <Grid item container xs={12} spacing={2}>
              <Grid item container xs={12} xl={8} direction="column">
                <Grid container item>
                  <Station />
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                xl={4}
                direction="column"
                spacing={2}
                className={classes.hostAndSponsorWrapper}
              >
                {/* eslint-disable-next-line camelcase */}
                <OrganizationInfo title="About the Host" {...host_org} />
                {/* eslint-disable-next-line camelcase */}
                <OrganizationInfo title="Sponsors" {...sponsor_org} />
              </Grid>
              <Grid item xs={12}>
                <Score />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </AuthIsLoaded>
  )
}

export default EventItem
