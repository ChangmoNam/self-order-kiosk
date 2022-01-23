import { Card, CardActionArea, Container, CssBaseline, Paper, ThemeProvider } from "@material-ui/core";
import HomeScreen from "./screens/HomeScreen";
import {createMuiTheme} from '@material-ui/core/styles'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import ChooseScreen from "./screens/ChooseScreen";
import Order from "./screens/Order";
import { createStore } from "redux";
import { locationReducer } from "./Reducers";
import { Provider } from 'react-redux';

const theme = createMuiTheme({
  typography: {
    h1: { fontWeight: 'bold' },
    h2: {
      fontSize: '2rem',
      color: 'black',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: 'white',
    },
  },
  palette: {
    primary: {main: '#ff1744'},
    secondary: {
      main: '#118e16',
      contrastText: '#ffffff'
    }
  }
})

const store = createStore(locationReducer);

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container maxWidth="sm">
              <Routes>
                <Route path="/" element={<HomeScreen/>} exact />
                <Route path='/choose' element={<ChooseScreen/>} />
                <Route path='/order' element={<Order/>} />
              </Routes>
        </Container>
      </BrowserRouter>
    </Provider>


  );
}

export default App;
