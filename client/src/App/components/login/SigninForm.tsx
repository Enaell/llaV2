import React from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { fullNameLanguages } from '../common/utils';
import { LanguageType } from '../common/types';

type SigninFormType = {
  language: LanguageType,
  targetLanguage: LanguageType,
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleLanguageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleTargetLanguageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  passwordError: boolean, 
  usernameError: boolean, 
  emailAddressError: boolean,
  languageError: boolean, 
  targetLanguageError: boolean, 
};

export const SigninForm = ({
  language,
  targetLanguage,
  handleEmailChange, 
  handleUserNameChange, 
  handlePasswordChange,
  handleLanguageChange,
  handleTargetLanguageChange,
  passwordError, 
  usernameError, 
  emailAddressError
}: SigninFormType) => {
  
  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%', paddingBottom: '10px'}}>
      <TextField
        error = {usernameError}
        helperText = {usernameError ? translate('connection.usernameError') : null}       
        required
        margin="dense"
        id="name"
        label={translate('connection.username')}
        type="text"
        onChange={handleUserNameChange}
        fullWidth
      />
      <TextField
        error = {emailAddressError}
        helperText = {emailAddressError ? translate('connection.emailError') : null} 
        required
        margin="dense"
        id="email"
        label={translate('connection.email')}
        type="email"
        onChange={handleEmailChange}
        fullWidth
      />
      <TextField
        error = {passwordError}
        helperText = {passwordError ? translate('connection.passwordError') : null}
        required
        margin="dense"
        id="password"
        label={translate('connection.password')}
        type="password"
        onChange={handlePasswordChange}
        fullWidth
      />
      <Row style={{width: '100%'}} horizontal={'space-between'}>
        <FormControl style={{width: '45%'}}>
          <InputLabel>{translate('mainPage.language')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectLanguage"
            value={language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              translate.setLocale(event.target.value as string);
              handleLanguageChange(event.target.value as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
            }}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl style={{width: '45%'}}>
          <InputLabel>{translate('mainPage.targetLanguage')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectTargetLanguage"
            value={targetLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleTargetLanguageChange(event.target.value as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </Row>
  </Column>  );
}