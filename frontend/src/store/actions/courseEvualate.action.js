import {
    FETCH_COURSE_EVUALATE_PENDING,
    FETCH_COURSE_EVUALATE_SUCCESS,
    FETCH_COURSE_EVUALATE_FAIL,
    UPDATE_COURSE_EVUALATE_SUCCESS,
    DELETE_COURSE_EVUALATE_SUCCESS
}
    from '../constants/ActionTypes'
import {getCourseEvualate} from '../../services'

const fetchEvualatePending = mamh => ({
    type: FETCH_COURSE_EVUALATE_PENDING,
    payload: mamh
})

const fetchEvualateFail = (mamh, error) => ({
    type: FETCH_COURSE_EVUALATE_FAIL,
    payload: { mamh, error }
})

const fetchEvualateSuccess = (mamh, data) => ({
    type: FETCH_COURSE_EVUALATE_SUCCESS,
    payload: {
        mamh,
        data
    }
})

export const updateEvualateSuccess = (mamh, data) => ({
    type: UPDATE_COURSE_EVUALATE_SUCCESS,
    payload: {
        mamh,
        data
    }
})

export const deleteEvualateSuccess = (mamh) => ({
    type: DELETE_COURSE_EVUALATE_SUCCESS,
    payload: {
        mamh 
    }
})

export const fetchEvualate = mamh => {
    return dispatch => {
        dispatch(fetchEvualatePending(mamh))
        getCourseEvualate(mamh)
            .then(data => {
                dispatch(fetchEvualateSuccess(mamh, data))
            })
            .catch(err => {
                dispatch(fetchEvualateFail(mamh, err.message))
            })
    }
}