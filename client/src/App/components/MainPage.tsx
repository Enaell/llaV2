import React from 'react';
import { BrowserRouter, Route, Switch as RouterSwitch } from "react-router-dom";
import { Column } from "./common/Flexbox";
import Navbar from "./navbar";
import { UserPage } from "./userPage/UserPage";
import CardTrainingPage from "./cardTraining/CardTrainingPage";
import AddCardForm from "./addCard/AddCardForm";
import DictionaryPage from "./dictionaryPage/DictionaryPage";
import RouteNotFound from './RouteNotfound';
import Footer from "./footer/Footer";

export const MainPage = () => {
  return (
      <Column horizontal='center' style={{ width:'100%' }}>
        <Navbar/>
        <RouterSwitch>
          <Route exact path="/" component={UserPage}/>
          <Route path="/cardTraining" component={CardTrainingPage} />
          <Route path="/addCard" component={AddCardForm} />
          <Route path="/dictionary" component={DictionaryPage}/>
          <Route component={RouteNotFound} />
        </RouterSwitch>
        <Footer />
      </Column>
  )
}
