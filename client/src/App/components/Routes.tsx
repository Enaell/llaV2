import React from 'react';

import { Route, Switch as RouterSwitch } from 'react-router-dom'
import UserPage from './userPage'
import DictionaryPage from './dictionaryPage'
import CardTrainingPage from './cardTraining/CardTrainingPage-container';
import AddCardForm from './addCard/AddCardForm'
import RouteNotFound from './RouteNotfound';
import { connect } from 'react-redux';
import { LandingPage } from './landingPage/LandingPage';


function mapStateToProps(state: any){
  return {
    isLogged: state.user && (state.user.token || (state.user.language && state.user.targetLanguage))
  }
}


const RoutesSwitch = ({isLogged}: {isLogged?: boolean}) => {
  return (
    <>
      { isLogged ?
      <div style={{marginTop:'300px', width:'100%', minHeight: 'calc(100vh - 400px)'}}>
        <RouterSwitch>
          <Route exact path="/" component={UserPage}/>
          <Route path="/cardTraining" component={CardTrainingPage} />
          <Route path="/addCard" component={AddCardForm} />
          <Route path="/dictionary" component={DictionaryPage}/>
          <Route component={RouteNotFound} />
        </RouterSwitch>
      </div>
      : <LandingPage />}
    </>
  )
}

export default connect(mapStateToProps, null) (RoutesSwitch)