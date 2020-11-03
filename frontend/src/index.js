import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)