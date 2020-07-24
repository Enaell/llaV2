import React, { useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import { LanguageType, UserType } from '../common/types';
import { Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { welcomeSection, welcomeSectionLogged, backgroundImg, backgroundImgLogged, connectionDiv, statusReminderDiv } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../login/LoginTabs';
import { IntroductionColumn } from './introductionColumn';
import { MainHeader } from './MainHeader';

type HeaderViewType = {
  onLogin: (emailAddress: string, password: string) => void, 
  onSignin: (username: string, emailAddress: string, password: string, language: string, targetLanguage: string) => void,
  connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => void,
  tabNumber: number,
  changeTabNumber: (num: number) => void,
  isLogged: boolean,
  user?: UserType,
  setUserLanguage: (language: LanguageType) => void,
  setUserTargetLanguage: (targetLanguage: LanguageType) => void,
}

export const HeaderView = ({ 
  onLogin,
  onSignin,
  connectAsVisitor,
  tabNumber,
  changeTabNumber,
  isLogged = false,
  user,
  setUserLanguage,
  setUserTargetLanguage,
} : HeaderViewType) => {
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
  
  const onSigninClick = () => {
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
      onSignin(username, emailAddress, password, language, targetLanguage);
  };

  const onLoginClick = () => {
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmailAddressError(eaError);
    setPasswordError(pError);

    if (!(pError || eaError))
      onLogin(emailAddress, password);
  };

  function onConnectAsVisitor() {
    const lError = !language;
    const tlError = !targetLanguage;

    setTargetLanguageError(tlError);
    setLanguageError(lError);
    
    if (!(lError || tlError))
      connectAsVisitor(language, targetLanguage);
  }

  function handleTabChange(event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    setEmailAddressError(false);
    changeTabNumber(newValue);
  }

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={isLogged ? welcomeSectionLogged : welcomeSection}>
      <div style={isLogged ? backgroundImgLogged : backgroundImg}/>
      <Column horizontal='end' style={{width: '45%'}}>
      <Column horizontal={'start'} style={ isLogged ? statusReminderDiv : connectionDiv }>
      {!isLogged && 
        <Typography color="primary" variant='h3' noWrap>
          {translate('application-name')}
        </Typography>}
        {!isLogged ?
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row style={{height: '100%', width: '100%'}} vertical={'center'}>
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
                >
                  <Row horizontal='center' style={{width: '100%', paddingTop: '10px'}}>
                    {tabNumber === 0 &&
                      <Button type='submit' onClick={(e)=> {e.preventDefault();onConnectAsVisitor()}}> {translate('connection.visitor')}</Button>}
                    {tabNumber === 1 && 
                    <Button type='submit' onClick={(e)=> {e.preventDefault();onLoginClick()}}> {translate('connection.login')}</Button>}
                    {tabNumber === 2 && 
                    <Button type='submit' onClick={(e)=> {e.preventDefault();onSigninClick()}}> {translate('connection.signin')}</Button>}
                  </Row>
                </LoginTabs>
              </Column>
            </Row>
          </form> :
          <MainHeader user={user} setUserLanguage={setUserLanguage} setUserTargetLanguage={setUserTargetLanguage}/>
          }
      </Column>
      </Column>
    </Column>
  );
}



