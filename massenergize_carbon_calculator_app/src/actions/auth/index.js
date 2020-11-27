import _ from 'lodash'
import * as types from '../types'
import api from '../../api/massEnergize'
// getUser action to get the user
// TODO: May remove this action and just use userCreation action
export const fetchUser = async user => {
  // Attach email to request and send off to backend to get user info
  const response = await api.get('/cc/info/user', {
    params: {
      email: user.email,
    },
  })
  return _.get(response, 'data.data.userInfo')
}
// Handle Sign out action
export const signOut = () => ({
  type: types.SIGN_OUT,
})

// createUser action, send POST request to backend to save user registration info to database
export const createUser = async (formValues, email, selected) => {
  /* params :
    first_name,
    last_name,
    email,
    locality,
    groups,
    minimum_age,
    accepts_terms_and_conditions */
  console.log(selected)
  const params = {
    ...formValues,
    email,
    eventName: selected.name,
  }
  // Get CSRF token
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  // Attach CSRF token to request's header and all information
  const response = await api.post(`/cc/users`, {
    ...params,
    headers: { 'X-CSRFToken': csrfToken },
  })
  return response.data.data
}
