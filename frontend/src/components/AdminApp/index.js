import { Switch, Route } from 'react-router-dom'
import './admin.scss'
import Appbar from './Appbar'
import Homepage from './Homepage'
import LoginPage from './LoginPage'

const AdminApp = () => {

    return <div className="admin-wrapper">
        <Switch>
            <Route path='/'>
                <Appbar />
                <main>
                    <div className="container flex-fill d-flex flex-column">
                        <Homepage />
                    </div>
                </main>
            </Route>
            <Route path='/login'>
                <LoginPage />
            </Route>
        </Switch>
    </div>
}

export default AdminApp