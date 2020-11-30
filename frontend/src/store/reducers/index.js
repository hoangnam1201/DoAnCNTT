import { combineReducers } from 'redux'
import coursesReducer from './courses.reducer'
import coursesDetailsReducer from './courseDetails.reducer'

const rootReducer = combineReducers({
    courses: coursesReducer,
    course: coursesDetailsReducer
})

export default rootReducer