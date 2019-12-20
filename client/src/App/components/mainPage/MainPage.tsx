import React, { useState } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents';
import {welcomeSection, backgroundImg} from './styles.d';
import { UserType, LanguageType } from '../common/types';
import { fullNameLanguages } from '../common/utils';

const WelcomeSection = ({ onLoginClick, onSigninClick, connectAsVisitor }
  : {
    onLoginClick: () => {}, 
    onSigninClick: () => {},
    connectAsVisitor: (language: LanguageType, learningLanguage: LanguageType) => {}
  }) => {
  const [language, setLanguage] = useState('' as LanguageType);
  const [learningLanguage, setLearningLanguage] = useState('' as LanguageType);

  
  return (
      <Column className='welcomeSection' style={welcomeSection}>
        <div style={backgroundImg}></div>
      
        <PageTitle title={translate('mainPage.title')} ></PageTitle>
        <Row>
          <Button onClick={onLoginClick}> {translate('connection.login')}</Button>
          <Button onClick={onSigninClick}> {translate('connection.signin')}</Button>
        </Row>

        <Row>
          <Select
            labelId="selectLanguage"
            value={language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {     translate.setLocale(event.target.value as string)
              ;setLanguage(event.target.value as LanguageType)}}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
          <Select
            labelId="selectLearningLanguage"
            value={learningLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setLearningLanguage(event.target.value as LanguageType)}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
          <Button onClick={()=> language && learningLanguage && connectAsVisitor(language, learningLanguage)}>{translate('connection.visitor')}</Button>
        </Row>
      </Column>
  );
}

const MainPage = ({user, onLoginClick, onSigninClick, connectAsVisitor, history }
  : {
    user: UserType,
    onLoginClick: () => {}, 
    onSigninClick: () => {}, 
    connectAsVisitor: (language: LanguageType, learningLanguage: LanguageType) => {}
    history: any
  }) => {

  const handleOnCardTrainingClick = () => {
    history.push('/cardTraining');  
  }

  const handleOnDictionaryClick = () => {
    history.push('/dictionary');
  }

  return(
    <>
      {!user || ( (user && !user.token) || (user && user.role && user.role === 'Visitor')) 
      && <WelcomeSection onLoginClick={onLoginClick} onSigninClick={onSigninClick} connectAsVisitor={connectAsVisitor} />}

      <Button onClick={handleOnDictionaryClick}>
        Dictionary
      </Button>
      <Button onClick={handleOnCardTrainingClick}>
        Card Training
      </Button>
    </>
  );
}

export default MainPage;