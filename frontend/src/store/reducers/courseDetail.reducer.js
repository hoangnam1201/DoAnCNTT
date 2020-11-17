import {
    FETCH_COURSE_PENDING,
    FETCH_COURSE_FAIL,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_GOAL_PENDING,
    FETCH_COURSE_GOAL_SUCCESS,
    FETCH_COURSE_GOAL_FAIL,
    FETCH_COURSE_OUTCOME_PENDING,
    FETCH_COURSE_OUTCOME_SUCCESS,
    FETCH_COURSE_OUTCOME_FAIL
}
    from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    data: null
}

const courseDetailReducer = (state = {}, action) => {
    let course
    switch (action.type) {
        //FIRST FETCH
        case FETCH_COURSE_PENDING:
            course = {}
            course[action.payload] = {
                loading: true,
                error: ''
            }
            return {
                ...state,
                ...course
            }
        case FETCH_COURSE_SUCCESS:
            course = {}
            course[action.payload.mamh] = {
                general: action.payload.data,
                goal: initialState,
                outcome: initialState,
                evualate: initialState,
                content: initialState
            }
            return {
                ...state,
                ...course
            }
        case FETCH_COURSE_FAIL:
            course = {}
            course[action.payload.mamh] = {
                loading: false,
                error: action.payload.error
            }
            return {
                ...state,
                ...course
            }
        ////AFTER THAT
        //GOAL
        case FETCH_COURSE_GOAL_PENDING:
            course = { ...state }
            course[action.payload].goal = {
                ...course[action.payload].goal,
                loading: true,
                error: ''
            }
            return course
        case FETCH_COURSE_GOAL_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].goal = {
                ...course[action.payload.mamh].goal,
                loading: false,
                data: action.payload.data
            }
            return course
        case FETCH_COURSE_GOAL_FAIL:
            course = { ...state }
            course[action.payload.mamh].goal = {
                ...course[action.payload.mamh].goal,
                loading: false,
                error: action.payload.error
            }
            return course
        //OUTCOME
        case FETCH_COURSE_OUTCOME_PENDING:
            course = { ...state }
            course[action.payload].outcome = {
                ...course[action.payload].outcome,
                loading: true,
                error: ''
            }
            return course
        case FETCH_COURSE_OUTCOME_SUCCESS:
            course = { ...state }
            course[action.payload.mamh].outcome = {
                ...course[action.payload.mamh].outcome,
                loading: false,
                data: action.payload.data
            }
            return course
        case FETCH_COURSE_OUTCOME_FAIL:
            course = { ...state }
            course[action.payload.mamh].outcome = {
                ...course[action.payload.mamh].outcome,
                loading: false,
                error: action.payload.error
            }
            return course
        default:
            return state
    }
}

export default courseDetailReducer