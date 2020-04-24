import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {LoginTabs} from '../../login/LoginTabs'; 
import translate from 'counterpart';
import { LanguageType } from '../../common/types';

type LoginModalType = {
  onLogin: any,
  onSignin: any,
  closeModal: any,
  open: boolean,
  tabNumber: number,
  changeTabNumber: (num: number) => void
}

const LoginModal = ({onLogin, onSignin, closeModal, open, tabNumber, changeTabNumber} : LoginModalType) => {

  const [language, setLanguage] = useState('' as LanguageType);
  const [targetLanguage, setTargetLanguage] = useState('' as LanguageType);

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
    <div>
      <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
        <form>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
            {tabNumber === 0 && 
            <Button type='submit' onClick={(e)=>{e.preventDefault(); onLoginClick()}} color="primary">
              {translate('connection.login')}
            </Button>}
            {tabNumber === 1 && 
            <Button type='submit' onClick={(e)=>{e.preventDefault(); onSigninClick()}} color="primary">
              {translate('connection.signin')}
            </Button>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default LoginModal;
