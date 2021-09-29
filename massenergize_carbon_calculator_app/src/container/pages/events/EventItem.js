// React and Redux Component
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Styling Components
import { useParams } from 'react-router-dom'
import { fetchEvent } from '../../../actions'
import { useSelectedState } from '../../../context/SelectedContext'
import useAsync from '../../../hooks/useAsync'
import LoadingSpinner from '../../../components/LoadingSpinner'
import Component from '../../../components/events/EventItem'
import AuthWrapper from '../auth/AuthWrapper'

const EventItem = ({ location }) => {
  const { id } = useParams()
  const { setSelected } = useSelectedState()
  const [loading, setLoading] = useState(true)
  useAsync({
    getResKey: 'eventInfo',
    func: fetchEvent,
    setValue: setSelected,
    setLoading,
    params: id,
  })

  // Check if the information from backend has been received
  if (loading) {
    return <LoadingSpinner />
  }
  // Upon information received, render the stations with information of host and sponsor
  return (
    <AuthWrapper location={location}>
      <Component />
    </AuthWrapper>
  )
}

EventItem.propTypes = {
  location: PropTypes.any,
}

export default EventItem
