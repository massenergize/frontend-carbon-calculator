import api from '../../api/massEnergize'
// fetchEvents action, fetch all events for user selection
export const fetchEvents = async () => {
  const response = await api.get('/cc/info/events')
  return response.data.data
}
// fetchEvent action, fetch a single event
export const fetchEvent = async id => {
  const response = await api.get(`/cc/info/event/${id}`)
  return response.data.data
}
