import React, { Component } from 'react';
import CardTrainingPage from './cardTraining/CardTrainingPage-container';
import Navbar from './navbar'
import Footer from './footer/Footer'
import AddCardForm from './addCard/AddCardForm'
import MainPage from './mainPage'
import DictionaryPage from './dictionaryPage'
import { BrowserRouter, Route, Switch as RouterSwitch } from 'react-router-dom'
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import reducer from '../redux/reducer';
import counterpart from 'counterpart';
import localeFr from '../locale/fr.json';
import localeEn from '../locale/en.json';
import { composeWithDevTools } from 'redux-devtools-extension';
import RouteNotFound from './RouteNotfound';
import { Column } from './common/Flexbox';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../theme';
import { withStyles } from '@material-ui/core/styles';

console.log(React.version);

const styles = (theme: any) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '10px'
    },
    '*::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '*::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 1px 1px #f1f1f1'

    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: '#007600'
    },
  }
});

counterpart.registerTranslations('en', localeEn);
counterpart.registerTranslations('fr', localeFr);

counterpart.setLocale('fr');

let store = Redux.createStore(reducer, composeWithDevTools());


class App extends Component {
  render() {
    return (
      <ReactRedux.Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Column horizontal='center'>
              <Navbar/>
              <RouterSwitch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/cardTraining" component={CardTrainingPage} />
                <Route path="/addCard" component={AddCardForm} />
                <Route path="/dictionary" component={DictionaryPage}/>
                <Route component={RouteNotFound} />
              </RouterSwitch>
              <Footer />
            </Column>
          </BrowserRouter>
        </ThemeProvider>
      </ReactRedux.Provider>
    );
  }
}

export default withStyles(styles)(App);


  // useEffect(() => {
  //   fetch('http://localhost:5000/api/words', {method: "GET", headers: {
  //               "Content-Type": "application/json"
  //             }})
//     fetch("http://localhost:5000/api/users", {
//       method: "POST",
//       headers: {
// //        'Authorization': 'Token ' + UserTokenFromLogin
//         "Content-Type": "application/json"
//       },          
//       body: JSON.stringify({
//         "user": {
//           "email": "enael@enael.com",
//           "password": "enael"
//         }
//       })
//     })
//     .then(res => res.json())
//     .then(json => {
//       console.log('=================== create user =======================');
//       console.log(json);
//       fetch('http://localhost:5000/api/words', {method: "GET", headers: {
//                 'Authorization': 'Token ' + json.user.token,
//                 "Content-Type": "application/json"
//               }})
//     }).catch(e => console.log(e));
//     },[])
