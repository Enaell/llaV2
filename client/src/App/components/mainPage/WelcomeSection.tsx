import React, { useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import { welcomeSection, welcomeSectionLogged, backgroundImg, backgroundImgLogged, connectionDiv, statusReminderDiv } from './styles.d';
import { LanguageType } from '../common/types';
import { Button } from '@material-ui/core';
import translate from 'counterpart';
import { LoginTabs } from '../login/LoginTabs';
import { IntroductionColumn } from './introductionColumn';



export const WelcomeSection = ({ onLogin, onSignin, connectAsVisitor, tabNumber, changeTabNumber, isLogged = false }
  : {
    onLogin: (emailAddress: string, password: string) => {}, 
    onSignin: (username: string, emailAddress: string, password: string, language: string, targetLanguage: string) => {},
    connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => {},
    tabNumber: number,
    changeTabNumber: (num: number) => void,
    isLogged: boolean 
  }) => {

  const [language, setLanguage] = useState('' as LanguageType);
  const [targetLanguage, setTargetLanguage] = useState('' as LanguageType);

  const [username, setUsername] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState(false);
  const [emailAddressError, setEmailAddressError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [targetLanguageError, setTargetLanguageError] = React.useState(false);
  const [languageError, setLanguageError] = React.useState(false);


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
  }

  const onLoginClick = () => {

    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmailAddressError(eaError);
    setPasswordError(pError);

    if (!(pError || eaError))
      onLogin(emailAddress, password);
  }

  function handleTabChange(event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    setEmailAddressError(false);
    changeTabNumber(newValue);
  }

  return (
    <Column horizontal='center' vertical={'center'} className='welcomeSection' style={isLogged ? welcomeSectionLogged : welcomeSection}>
      <div style={isLogged ? backgroundImgLogged : backgroundImg}></div>
      <Column style={ isLogged ? statusReminderDiv : connectionDiv }>
        <Row style={{height: '100%'}} vertical={'center'}>
        {!isLogged && 
          <>
            <Column vertical={'space-around'} style={{ borderRight: '#a8c1a3 solid 2px', width: '50%', height: '250px', paddingRight: '25px' }}>
              <IntroductionColumn 
                language={language} 
                targetLanguage={targetLanguage} 
                setLanguage={setLanguage} 
                setTargetLanguage={setTargetLanguage} 
                connectAsVisitor={connectAsVisitor}
              />
            </Column>
            <Column horizontal='center' style={{width: '50%', height: '250px'}}>
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
              />
              {tabNumber === 0 && 
                <Button onClick={onLoginClick}> {translate('connection.login')}</Button>}
              {tabNumber === 1 && 
                <Button onClick={onSigninClick}> {translate('connection.signin')}</Button>}
            </Column> 
          </>
          }
        </Row>
      </Column>
    </Column>
  );
}



