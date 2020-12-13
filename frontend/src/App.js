import { Switch, Route } from 'react-router-dom'
import './components/index.scss'
import Appbar from './components/Appbar'
import Sidebar from './components/Appbar/sidebar'
import CourseList from './components/CourseList'
import CourseDetails from './components/CourseDetails'
import Homepage from './components/Homepage'
import LoginPage from './components/LoginPage'
import CreateCourse from './components/CreateCourse'

const App = () => {

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
                  <CreateCourse />
                </Route>
                <Route exact path="/course">
                  <CourseList />
                </Route>
                <Route path="/course/:mamh">
                  <CourseDetails />
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </Route>
    </Switch>
  </div>
}

export default App