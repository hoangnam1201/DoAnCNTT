import {
    FETCH_COURSE_GOAL_PENDING,
    FETCH_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_GOAL_FAIL
}
    from '../constants/ActionTypes'
import { getCourseGoal } from '../../services'

const fetchGoalPending = mamh => ({
    type: FETCH_COURSE_GOAL_PENDING,
    payload: mamh
})

const fetchGoalSuccess = data => ({
    type: FETCH_COURSE_GOAL_SUCCESS,
    payload: data
})

const fetchGoalFail = (mamh, error) => ({
    type: FETCH_COURSE_GOAL_FAIL,
    payload: { mamh, error }
})

export const fetchGoal = mamh => {
    return dispatch => {
        console.log(fetchGoalPending(mamh))
        dispatch(fetchGoalPending(mamh))
        getCourseGoal(mamh)
            .then(data => ({ mamh, data }))
            .then(data => {
                dispatch(fetchGoalSuccess(data))
            })
            .catch(err => {
                dispatch(fetchGoalFail(mamh, err.message))
            })
    }
}