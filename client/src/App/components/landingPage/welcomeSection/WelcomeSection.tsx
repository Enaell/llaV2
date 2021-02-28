import React, { useState } from 'react';
import { Column, Row } from '../../common/Flexbox';
import { LanguageType } from '../../common/types';
import { Typography } from '@material-ui/core';
import { welcomeSection, backgroundImg, connectionDiv } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../../login/LoginTabs';
import { IntroductionColumn } from './IntroductionColumn';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../common/Buttons';
import { userApi } from '../../../apiClient/ApiClient';

type WelcomeSectionType = {
  tabNumber: number,
  changeTabNumber: (num: number) => void,
  position?: 'absolute' | 'relative'
}

export const WelcomeSection = ({ 
  tabNumber,
  changeTabNumber,
  position = 'relative'
} : WelcomeSectionType) => {

  const dispatch = useDispatch();

  const [language, setLanguage] = useState('' as LanguageType);
  const [targetLanguage, setTargetLanguage] = useState('' as LanguageType);

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [targetLanguageError, setTargetLanguageError] = useState(false);
  const [languageError, setLanguageError] = useState(false);


  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUsername(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setEmailAddress(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setPassword(event.target.value);
  }
  
  const onSigninClick = async () => {
    const usError = !username;
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    const lError = !language;
    const tlError = !targetLanguage;

    setUsernameError(usError);
    setPasswordError(pError);
    setEmailAddressError(eaError);
    setTargetLanguageError(tlError);
    setLanguageError(lError);

    if (!(usError || pError || eaError || tlError || lError))
    {
        const loggedUser = await userApi.signin({username, email: emailAddress, password, language, targetLanguage});
        if (loggedUser.success)
          dispatch({type: 'LOGIN', payload: loggedUser.message.user});
        else {
          dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Signin Error !"}});
          dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
        }
    } 
      // onSignin(username, emailAddress, password, language, targetLanguage);
  };

  const onLoginClick = async () => {
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmailAddressError(eaError);
    setPasswordError(pError);

    if (!(pError || eaError)) {
      const loggedUser = await userApi.auth(emailAddress, password);
      if (loggedUser.success)
        dispatch({type: 'LOGIN', payload: loggedUser.message});
      else {
        dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Login Error !"}});
        dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
      }
    }
      //onLogin(emailAddress, password);
  };

  function onConnectAsVisitor() {
    const lError = !language;
    const tlError = !targetLanguage;

    setTargetLanguageError(tlError);
    setLanguageError(lError);
    
    if (!(lError || tlError))
      dispatch({type: 'LOGIN_AS_VISITOR', payload: {language: language, targetLanguage: targetLanguage}})
      // connectAsVisitor(language, targetLanguage);
  }

  function onDiscoverClick() {
    dispatch({type: 'DISCOVER'})
  }

  function handleTabChange(_event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    setEmailAddressError(false);
    setLanguageError(false);
    setTargetLanguageError(false);
    changeTabNumber(newValue);
  }

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={backgroundImg}/>
      <Column horizontal='end' width='45%'>
        <Column horizontal={'start'} style={ connectionDiv }>
          <Typography color="primary" variant='h3' noWrap>
            {translate('application-name')}
          </Typography>
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row width='100%' height='100%' vertical={'center'}>
              <Column height='100%' width='100%' vertical={'space-around'}>
                <IntroductionColumn />
                <LoginTabs
                  tabNumber={tabNumber}
                  language={language}
                  targetLanguage={targetLanguage}
                  handleTabChange={handleTabChange} 
                  handleEmailChange={handleEmailChange} 
                  handlePasswordChange={handlePasswordChange}
                  handleLanguageChange={setLanguage}
                  handleTargetLanguageChange={setTargetLanguage}
                  passwordError={passwordError} 
                  emailAddressError={emailAddressError} 
                  usernameError={usernameError}
                  languageError={languageError}
                  targetLanguageError={targetLanguageError}
                  handleUserNameChange={handleUserNameChange}
                  visitorOption
                  orientation='vertical'
                  style={{marginLeft: '-20px'}}
                >
                  <Row horizontal='space-around' style={{width: '100%', paddingTop: '10px'}}>
                    {tabNumber === 0 &&
                      <>
                        <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onConnectAsVisitor}> {translate('connection.visitor')}</LoadingButton>
                        <LoadingButton className='darkButton' onClick={onDiscoverClick}>{translate('connection.moreDetails')}</LoadingButton> 
                      </>}
                    {tabNumber === 1 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onSigninClick}> {translate('connection.signin')}</LoadingButton>}
                    {tabNumber === 2 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onLoginClick}> {translate('connection.login')}</LoadingButton>}
                  </Row>
                </LoginTabs>
              </Column>
            </Row>
          </form>
        </Column>
      </Column>
    </Column>
  );
}
