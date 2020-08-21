import React, { useState } from 'react';
import { Column, Row } from '../../common/Flexbox';
import { WhiteButton, DarkButton } from '../../common/GenericComponents'
import { LanguageType } from '../../common/types';
import { Typography } from '@material-ui/core';
import { welcomeSection, backgroundImg, connectionDiv } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../../login/LoginTabs';
import { IntroductionColumn } from './IntroductionColumn';
import { useDispatch } from 'react-redux';

type WelcomeSectionType = {
  onLogin: (emailAddress: string, password: string) => void, 
  onSignin: (username: string, emailAddress: string, password: string, language: string, targetLanguage: string) => void,
  connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => void,
  tabNumber: number,
  changeTabNumber: (num: number) => void,
  position?: 'absolute' | 'relative'
}

export const WelcomeSection = ({ 
  onLogin,
  onSignin,
  connectAsVisitor,
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
                        <WhiteButton variant='outlined' type='submit' onClick={(e)=> {e.preventDefault();onConnectAsVisitor()}}> {translate('connection.visitor')}</WhiteButton>
                        <DarkButton onClick={e => {e.preventDefault(); onDiscoverClick()}}>{translate('connection.moreDetails')}</DarkButton> 
                      </>}
                    {tabNumber === 1 && 
                    <WhiteButton variant='outlined' type='submit' onClick={(e)=> {e.preventDefault();onSigninClick()}}> {translate('connection.signin')}</WhiteButton>}
                    {tabNumber === 2 && 
                    <WhiteButton  variant='outlined' type='submit' onClick={(e)=> {e.preventDefault();onLoginClick()}}> {translate('connection.login')}</WhiteButton>}
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