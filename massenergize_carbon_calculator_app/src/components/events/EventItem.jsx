import React from 'react'
import { Grid, makeStyles, Paper } from '@material-ui/core'
import HostInfo from './HostInfo'
import SponsorInfo from './SponsorInfo'
import Station from '../../pages/events/Stations'
import Score from './Score'
import { useSelectedState } from '../../context/SelectedContext'

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
  const { host_org } = selected
  return (
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
            <HostInfo {...host_org} />
            <SponsorInfo
              sponsorLogo={selected?.sponsor_logo}
              sponsorName={selected?.sponsor_org}
              sponsorUrl={selected?.sponsor_url}
            />
          </Grid>
          <Grid item xs={12}>
            <Score />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default EventItem
