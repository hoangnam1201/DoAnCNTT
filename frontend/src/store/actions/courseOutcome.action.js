import {
    FETCH_COURSE_OUTCOME_PENDING,
    FETCH_COURSE_OUTCOME_SUCCESS,
    FETCH_COURSE_OUTCOME_FAIL
}
    from '../constants/ActionTypes'
import { getCourseOutcome } from '../../services'

const fetchOutcomePending = mamh => ({
    type: FETCH_COURSE_OUTCOME_PENDING,
    payload: mamh
})

const fetchOutcomeSuccess = data => ({
    type: FETCH_COURSE_OUTCOME_SUCCESS,
    payload: data
})

const fetchOutcomeFail = (mamh, error) => ({
    type: FETCH_COURSE_OUTCOME_FAIL,
    payload: { mamh, error }
})

export const fetchOutcome = mamh => {
    return dispatch => {
        console.log(fetchOutcomePending(mamh))
        dispatch(fetchOutcomePending(mamh))
        getCourseOutcome(mamh)
            .then(data => ({ mamh, data }))
            .then(data => {
                dispatch(fetchOutcomeSuccess(data))
            })
            .catch(err => {
                dispatch(fetchOutcomeFail(mamh, err.message))
            })
    }
}