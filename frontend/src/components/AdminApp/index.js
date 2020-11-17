import { Switch, Route } from 'react-router-dom'
import './admin.scss'
import Appbar from './Appbar'
import Sidebar from './Appbar/sidebar'
import CourseList from './CourseList'
import CoursePage from './CoursePage'
import Homepage from './Homepage'
import LoginPage from './LoginPage'
import NewCourse from './NewCourse'

const AdminApp = () => {

    return <div className="admin-wrapper">
        <Switch>
            <Route path='/login'>
                <LoginPage />
            </Route>
            <Route path='/'>
                <Sidebar class="persist" />
                <Appbar />
                <div className="content">
                    <main>
                        <div className="container flex-fill">
                            <Switch>
                                <Route exact path='/'>
                                    <Homepage />
                                </Route>
                                <Route path="/course/create">
                                    <NewCourse />
                                </Route>
                                <Route exact path="/course">
                                    <CourseList />
                                </Route>
                                <Route path="/course/:mamh">
                                    <CoursePage />
                                </Route>
                            </Switch>
                        </div>
                    </main>
                </div>
            </Route>
        </Switch>
    </div>
}

export default AdminApp