import _ from 'lodash'
import api from '../../api/massEnergize'
import objectToFormData from '../../utils/objectToFormData'

export const fetchCCUser = async user => {
  const idToken = await user.getIdToken(true)
  const formData = objectToFormData({ data: { idToken } })
  const userProfileResponse = await api.post(`/v3/auth.login`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  const CCUserProfile = await api.get('/v3/cc/info/user', {
    params: {
      email: user.email,
    },
  })

  return {
    ..._.get(CCUserProfile, 'data.data'),
    ..._.get(userProfileResponse, 'data.data'),
  }
}

export const signOut = async () => {
  const formData = objectToFormData({})
  await api.post(`/v3/auth.logout`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const createUser = async (formValues, email, selected) => {
  const params = {
    ...formValues,
    email,
    eventName: selected.name,
  }
  const csrfResponse = await api.get(`/auth/csrf`)
  const { csrfToken } = csrfResponse.data.data
  const response = await api.post(
    `/cc/users`,
    { ...params },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
    },
  )
  return response.data.data
}
