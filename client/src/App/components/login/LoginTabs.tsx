import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {LoginForm} from './LoginForm';
import {SigninForm} from './SigninForm';
import translate from 'counterpart';
import { Column } from '../common/Flexbox';

type LoginTabsType = {
    tabNumber: number,
    handleTabChange: any,
    handleEmailChange: any,
    handlePasswordChange: any,
    passwordError: any,
    emailAddressError: any,
    handleUserNameChange: any,
    usernameError: any
}

export const LoginTabs = ({tabNumber, handleTabChange, handleEmailChange, handlePasswordChange, passwordError, emailAddressError, usernameError, handleUserNameChange} : LoginTabsType) => {
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
                handleEmailChange = {handleEmailChange} 
                handleUserNameChange = {handleUserNameChange} 
                handlePasswordChange = {handlePasswordChange}
                passwordError = {passwordError}
                emailAddressError = {emailAddressError}
                usernameError = {usernameError}
                />
            }
        </Column>
    )
} 
