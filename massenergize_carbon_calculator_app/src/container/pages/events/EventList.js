// React and redux import
import React, { useState } from 'react'
// Styling imports
import { CircularProgress } from '@material-ui/core'
import Component from '../../../components/events/EventList'
import { fetchEvents } from '../../../actions'
import { useEventState } from '../../../context/EventContext'
import useAsync from '../../../hooks/useAsync'

// EventList component
const EventList = () => {
  const { eventState, setEventState } = useEventState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useAsync({
    setLoading,
    setValue: setEventState,
    setError,
    func: fetchEvents,
    getResKey: 'eventList',
  })

  // Rendering List of Events
  if (!loading && !eventState) return <CircularProgress />
  // Main rendering function calling render list function
  return <Component events={eventState} error={error} />
}

export default EventList
