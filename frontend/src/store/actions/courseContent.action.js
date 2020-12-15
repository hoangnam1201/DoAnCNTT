import {
    FETCH_COURSE_CONTENT_PENDING,
    FETCH_COURSE_CONTENT_SUCCESS,
    FETCH_COURSE_CONTENT_FAIL,
    UPDATE_COURSE_CONTENT_SUCCESS,
    DELETE_COURSE_CONTENT_SUCCESS
}
    from '../constants/ActionTypes'
import {getCourseContent} from '../../services'

const fetchContentPending = mamh => ({
    type: FETCH_COURSE_CONTENT_PENDING,
    payload: mamh
})

const fetchContentFail = (mamh, error) => ({
    type: FETCH_COURSE_CONTENT_FAIL,
    payload: { mamh, error }
})

const fetchContentSuccess = (mamh, data) => ({
    type: FETCH_COURSE_CONTENT_SUCCESS,
    payload: {
        mamh,
        data
    }
})

export const updateContentSuccess = (mamh, data) => ({
    type: UPDATE_COURSE_CONTENT_SUCCESS,
    payload: {
        mamh,
        data
    }
})

export const deleteContentSuccess = (mamh) => ({
    type: DELETE_COURSE_CONTENT_SUCCESS,
    payload: {
        mamh 
    }
})

export const fetchContent = mamh => {
    return dispatch => {
        dispatch(fetchContentPending(mamh))
        getCourseContent(mamh)
            .then(data => {
                dispatch(fetchContentSuccess(mamh, data))
            })
            .catch(err => {
                dispatch(fetchContentFail(mamh, err.message))
            })
    }
}