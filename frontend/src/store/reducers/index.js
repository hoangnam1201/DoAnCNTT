import { combineReducers } from 'redux'
import coursesReducer from './courses.reducer'
import coursesDetailReducer from './courseDetail.reducer'

const rootReducer = combineReducers({
    courses: coursesReducer,
    course: coursesDetailReducer
})

export default rootReducer