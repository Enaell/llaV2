import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {LoginForm} from './LoginForm';
import {SigninForm} from './SigninForm';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import { LanguageType } from '../common/types';
import { LogAsVisitorForm } from './LogAsVisitorForm';

type LoginTabsType = {
    tabNumber: number,
    handleTabChange: any,
    language: LanguageType,
    targetLanguage: LanguageType,
    handleEmailChange: any,
    handlePasswordChange: any,
    passwordError: any,
    emailAddressError: any,
    handleUserNameChange: any,
    usernameError: any,
    handleLanguageChange: any,
    handleTargetLanguageChange: any,
    languageError: any,
    targetLanguageError: any,
    visitorOption?: boolean,
    orientation?: 'vertical' | 'horizontal',
    style?: any,
    children?: any
}

const TabsWrapper = ({orientation, children, style={}}: {
    orientation: 'vertical' | 'horizontal',
    children: React.ReactNode,
    style?: any
}) => {
    return (<>
        {orientation === 'horizontal' 
        ? <Column  vertical={'space-between'} style={style}> {children} </Column>
        : <Row horizontal='space-between' style={{ paddingTop: '15px', ...style}}> {children} </Row>
    }
    </>)
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
    targetLanguageError,
    visitorOption = false,
    orientation = 'horizontal',
    style = {},
    children
} : LoginTabsType) => {
    console.log(orientation)
    return (
        <TabsWrapper orientation={orientation} style={style}>
            <Tabs
                orientation={orientation}
                value={orientation === 'horizontal' ? tabNumber - 1 : tabNumber}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={orientation === 'vertical' ? {paddingTop: '15px'}: {}}
            >
                {visitorOption && <Tab label= {translate('connection.discover')}/>}
                <Tab label={translate('connection.signin')}/>
                <Tab label={translate('connection.login')}/>
            </Tabs>
            <Column vertical='space-around' style={{width: orientation === 'vertical' ? 'calc(100% - 160px)': 'inherit', padding: '0 20px'}}>
                {tabNumber === 0 &&
                <LogAsVisitorForm
                    language={language}
                    targetLanguage={targetLanguage}
                    setLanguage={handleLanguageChange}
                    setTargetLanguage={handleTargetLanguageChange}
                    languageError={languageError}
                    targetLanguageError={targetLanguageError}
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
                {tabNumber === 2 && 
                <LoginForm 
                    handleEmailChange = {handleEmailChange} 
                    handlePasswordChange = {handlePasswordChange}
                    passwordError = {passwordError}
                    emailAddressError = {emailAddressError}
                />
                }
                {children}
            </Column>
        </TabsWrapper>
    )
} 
