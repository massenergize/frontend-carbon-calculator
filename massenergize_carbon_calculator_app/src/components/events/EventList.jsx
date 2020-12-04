import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LocationOn } from '@material-ui/icons'
import Container from '../Container'

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: 'black',
    width: '100%',
    cursor: 'default',
  },
  container: {
    padding: '10px',
  },
  displayName: {
    color: '#6CB8E5',
    fontWeight: 'bold',
    fontSize: '2.5em',
    display: 'flex',
  },
  location: { fontSize: '1.5em' },
  locationIcon: { fontSize: '1em' },
  event: {
    fontSize: '1em',
    transition: 'transform .2s',
    '&:hover': {
      backgroundColor: '#f2f2f2',
      transform: 'scale(1.01)',
    },
  },
  list: {
    padding: 0,
    width: '100%',
    '& :last-child': {
      borderBottom: 'none',
    },
  },
  listItem: {
    padding: '0px',
    borderBottom: '1px solid #CFCFCF',
    minHeight: '50px',
  },
  title: {
    margin: '10px 30px',
    fontWeight: 'bold',
    color: '#6cb8e5',
  },
})

const EventRow = ({ displayName, location, month, day }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Grid container direction="row">
        <Grid item xs={1} container direction="column" alignItems="center">
          <Grid item>
            <Typography>{month}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{day}</Typography>
          </Grid>
        </Grid>
        <ListItemText
          primary={
            <Typography variant="h5" className={classes.displayName}>
              {displayName}
            </Typography>
          }
          secondary={
            <Typography className={classes.location}>
              <span>
                <LocationOn className={classes.locationIcon} />
              </span>
              {location}
            </Typography>
          }
        />
      </Grid>
    </div>
  )
}

EventRow.propTypes = {
  day: PropTypes.string,
  month: PropTypes.string,
  displayName: PropTypes.string,
  location: PropTypes.string,
}

const EventList = ({ events, setSelected }) => {
  const classes = useStyles()
  return (
    <Container
      title={
        <Typography variant="h4" className={classes.title}>
          Upcoming Event
        </Typography>
      }
    >
      <List className={classes.list}>
        {events.map(event => {
          // Define dates and months for reformatting
          const date = moment.utc(event.datetime)
          return (
            <ListItem key={event.name} className={classes.listItem}>
              <Link
                className={`${classes.link} ${classes.event}`}
                to={`/event/${event.name}`}
                onClick={() => setSelected(event)}
              >
                <EventRow
                  displayName={event.displayname}
                  location={event.location}
                  day={date.format('D')}
                  month={date.format('MMM')}
                />
              </Link>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}

EventList.propTypes = {
  events: PropTypes.array,
  setSelected: PropTypes.func,
}

export default EventList
