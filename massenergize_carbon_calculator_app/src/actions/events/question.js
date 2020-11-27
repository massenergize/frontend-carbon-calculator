import * as types from '../types'
import api from '../../api/massEnergize'
// fetchQuestions action
export const fetchQuestions = actionName => async dispatch => {
  const response = await api.get(`/cc/info/${actionName}`)

  dispatch({
    type: types.FETCH_ACTION_QUESTIONS,
    payload: response.data.data.questionInfo,
  })
}
