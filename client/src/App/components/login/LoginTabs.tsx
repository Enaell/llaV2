import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {LoginForm} from './LoginForm';
import {SigninForm} from './SigninForm';
import translate from 'counterpart';
import { Column } from '../common/Flexbox';
import { LanguageType } from '../common/types';

type LoginTabsType = {
    tabNumber: number,
    language: LanguageType,
    targetLanguage: LanguageType,
    handleTabChange: any,
    handleEmailChange: any,
    handlePasswordChange: any,
    passwordError: any,
    emailAddressError: any,
    handleUserNameChange: any,
    usernameError: any,
    handleLanguageChange: any,
    handleTargetLanguageChange: any,
    languageError: any,
    targetLanguageError: any
}

export const LoginTabs = ({
    tabNumber, 
    language,
    targetLanguage,
    handleTabChange, 
    handleEmailChange, 
    handlePasswordChange, 
    passwordError, 
    emailAddressError, 
    usernameError, 
    handleUserNameChange,
    handleLanguageChange,
    handleTargetLanguageChange,
    languageError,
    targetLanguageError
} : LoginTabsType) => {
    return (
        <Column vertical={'space-between'}>
            <Tabs
                value={tabNumber}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label={translate('connection.login')}/>
                <Tab label={translate('connection.signin')}/>
            </Tabs>
            {tabNumber === 0 && 
                <LoginForm 
                handleEmailChange = {handleEmailChange} 
                handlePasswordChange = {handlePasswordChange}
                passwordError = {passwordError}
                emailAddressError = {emailAddressError}
                />
            }
            {tabNumber === 1 &&
                <SigninForm
                language= {language}
                targetLanguage = {targetLanguage}
                handleEmailChange = {handleEmailChange} 
                handleUserNameChange = {handleUserNameChange} 
                handlePasswordChange = {handlePasswordChange}
                handleLanguageChange = {handleLanguageChange}
                handleTargetLanguageChange = {handleTargetLanguageChange}
                passwordError = {passwordError}
                emailAddressError = {emailAddressError}
                usernameError = {usernameError}
                languageError = {languageError}
                targetLanguageError = {targetLanguageError}

                />
            }
        </Column>
    )
} 
