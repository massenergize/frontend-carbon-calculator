import * as types from './types';
import api from '../api/massEnergize';
import { ROOT } from '../api/urls';

// export const signIn = () => async dispatch => {
//     const response = await api.get(`auth/login`);

//     dispatch({ type: SIGN_IN, payload: response.data });
// }
export const questionAnswered = (actionName, questionTag, answer, skipQs) => dispatch => {
    dispatch({
        type: types.QUESTION_ANSWERED,
        payload: {
            actionName,
            questionTag,
            answer,
            skipQs,
        }
    });
}

export const signIn = (userId, method) => {
    return {
        type: types.SIGN_IN,
        payload: {
            userId,
            method
        }
    };
};

export const signOut = () => {
    return {
        type: types.SIGN_OUT
    };
};

export const getActionInfo = (actionTag) => async dispatch => {
    const response = await api.get(`/cc/info/action/${actionTag}`)
    if (!response.data.action) console.log(actionTag)
    dispatch({ type: types.FETCH_ACTION_INFO, payload: response.data })
}

export const fetchEvents = () => async dispatch => {
    const response = await api.get("/cc/info/events");
    dispatch({ type: types.FETCH_EVENTS, payload: response.data })
}

export const fetchEvent = id => async dispatch => {
    const response = await api.get(`/cc/info/event/${id}`);
    dispatch({ type: types.FETCH_EVENT, payload: response.data });
}

export const getScore = (actionName, params) => async dispatch => {
    const response = await api.get(`/cc/estimate/${actionName}`, { params: { ...params } });
    dispatch({ type: types.GET_SCORE, payload: { response: response.data, actionType: actionName } });
}


export const postJson = async (url, body) => {
    try {
        const csrfResponse = await api.get(`${ROOT}/auth/csrf`, {
            credentials: 'include'
        });
        const csrfToken = csrfResponse.data.csrfToken;
        const response = await api.post(url, body, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });
        console.log(response);
        const myJson = await response.json();
        return myJson;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}