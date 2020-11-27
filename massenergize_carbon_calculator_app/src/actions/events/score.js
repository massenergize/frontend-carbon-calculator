import api from '../../api/massEnergize'
// Send query to backend to calculate points and post score
export const getScore = async ({ actionName, ...params }) => {
  // No userId considered a get request
  const response = await api.get(`/cc/estimate/${actionName}`, {
    params: { ...params },
  })
  return response.data.data
}

export const postScore = async ({ userId, actionName, ...params }) => {
  // Get CSRF token
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to the headers and send request up to backend
  const response = await api.post(`/cc/estimate/${actionName}`, {
    ...params,
    user_id: userId,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data.data
}

export const unpostScore = async ({ userId, actionName, ...params }) => {
  // POST request to save user answers to database
  // Get CSRF token before sending POST request
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to the headers and send request up to backend
  const response = await api.post(`/cc/undo/${actionName}`, {
    ...params,
    user_id: userId,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data.data
}
