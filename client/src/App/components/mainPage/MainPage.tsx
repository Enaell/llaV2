import React from 'react';
import { Button, Select, MenuItem, Fade } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents';
import { UserType, LanguageType } from '../common/types';
import {WelcomeSection} from './WelcomeSection';
import {UserBoard} from './UserBoard';


const MainPage = ({user, onLogin, onSignin, connectAsVisitor,  tabNumber, changeTabNumber, history }
  : {
    user: UserType,
    onLogin: (emailAddress: string, password: string) => {}, 
    onSignin: (username: string, emailAddress: string, password: string) => {},
    connectAsVisitor: (language: LanguageType, learningLanguage: LanguageType) => {},
    tabNumber: number,
    changeTabNumber: (num: number) => void,  
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
      <WelcomeSection
        isLogged={user && user.language !== undefined && user.learningLanguage !== undefined}
        onLogin={onLogin} 
        onSignin={onSignin} 
        connectAsVisitor={connectAsVisitor} 
        tabNumber={tabNumber} 
        changeTabNumber={changeTabNumber}
      />
      <Fade timeout={4000} in={user && user.language !== undefined && user.learningLanguage !== undefined}>
        <Column horizontal='center' style={{ width:'100%', paddingTop: '350px' }}>
          {/* <PageTitle title={translate('mainPage.title')} ></PageTitle>
          <Button onClick={handleOnDictionaryClick}>
            Dictionary
          </Button>
          <Button onClick={handleOnCardTrainingClick}>
            Card Training
          </Button> */}
          <UserBoard userModules={[
            {
              name: 'news', 
              lgPosition: {x: 0, y: 0, w: 3, h: 2 }, 
              mdPosition: {x: 0, y: 0, w: 3, h: 2 }, 
              smPosition: {x: 0, y: 0, w: 2, h: 2 }, 
              xsPosition: {x: 0, y: 0, w: 1, h: 1 }
            },
            {
              name: 'fastExercice',
              lgPosition: {x: 5, y: 0, w: 6, h: 2 }, 
              mdPosition: {x: 5, y: 0, w: 6, h: 2 }, 
              smPosition: {x: 3, y: 0, w: 3, h: 4 }, 
              xsPosition: {x: 3, y: 0, w: 3, h: 4 }
            }]} />
        </Column>
      </Fade>
    </>
  );
}

export default MainPage;