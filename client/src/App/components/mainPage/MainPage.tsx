import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, Fade } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents';
import { UserType, LanguageType, UserModulesType } from '../common/types';
import {WelcomeSection} from './WelcomeSection';
import {UserBoard} from './UserBoard';
import { WidthProvider } from 'react-grid-layout';


const MainPage = ({user, onLogin, onSignin, connectAsVisitor,  tabNumber, changeTabNumber, updateUserBoard, history }
  : {
    user: UserType,
    onLogin: (emailAddress: string, password: string) => {}, 
    onSignin: (username: string, emailAddress: string, password: string) => {},
    connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => {},
    tabNumber: number,
    changeTabNumber: (num: number) => void,
    updateUserBoard: (userBoard: UserModulesType, token: string | undefined) => Promise<void>,
    history: any
  }) => {


  const [onModify, setOnModify] = useState(false);

  const [newUserModules, setNewUserModules] = useState({...(user.userBoard)});

  const saveAndStopModify = async () => {
    if (newUserModules) 
    {
      await updateUserBoard(newUserModules, user.token);
      setOnModify(false);
    }
  }

  const handleOnCardTrainingClick = () => {
    history.push('/cardTraining');  
  }

  const handleOnDictionaryClick = () => {
    history.push('/dictionary');
  }

  return(
    <>
      <WelcomeSection
        isLogged={user && user.language !== undefined && user.targetLanguage !== undefined}
        onLogin={onLogin} 
        onSignin={onSignin} 
        connectAsVisitor={connectAsVisitor} 
        tabNumber={tabNumber} 
        changeTabNumber={changeTabNumber}
      />
      { user && user.language !== undefined && user.targetLanguage !== undefined &&
      <Fade timeout={4000} in={user && user.language !== undefined && user.targetLanguage !== undefined}>
        <Column horizontal='center' style={{ width:'100%', paddingTop: '350px' }}>
          {
          /* <PageTitle title={translate('mainPage.title')} ></PageTitle>
          <Button onClick={handleOnDictionaryClick}>
            Dictionary
          </Button>
                    <Button onClick={handleOnCardTrainingClick}>
            Modify
          </Button>

          */
          }
          <UserBoard 
            onModify={onModify}
            setNewUserModules={setNewUserModules}
            userModules={
              user && user.userBoard ?
              user.userBoard
              : {} } 
            setOnModify={setOnModify}
            saveModules={saveAndStopModify}
            cancelModification={() => setOnModify(false)}
          />
          { onModify &&
            <Row>
              <Button onClick={()=> setOnModify(false) }>
                  Cancel
              </Button>
              <Button onClick={()=> {
                  saveAndStopModify();
                }
              }>
                  Save
              </Button>
            </Row>
          }
        </Column>
      </Fade>}
    </>
  );
}

export default MainPage;