import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Open Sans", sans-serif, "Roboto", 'Lato'`,
    fontSize: "14px",
  }
})

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
)