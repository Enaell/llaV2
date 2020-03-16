import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, Fade } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents';
import { UserType, LanguageType, UserModulesType } from '../common/types';
import {WelcomeSection} from './WelcomeSection';
import {UserBoard} from './UserBoard';
import { WidthProvider } from 'react-grid-layout';
import { moduleUrl } from '../common/utils';


const MainPage = ({user, onLogin, onSignin, connectAsVisitor,  tabNumber, changeTabNumber, updateUserBoard, setLanguage, setTargetLanguage, history }
  : {
    user: UserType,
    onLogin: (emailAddress: string, password: string) => void, 
    onSignin: (username: string, emailAddress: string, password: string) => void,
    connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => void,
    tabNumber: number,
    changeTabNumber: (num: number) => void,
    updateUserBoard: (userBoard: UserModulesType, token: string | undefined) => Promise<void>,
    setLanguage: (language: LanguageType, token: string | undefined) => void,
    setTargetLanguage: (targetLanguage: LanguageType, token: string | undefined) => void,
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

  function goToPage (url: string) {
    history.push(url)
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
        user={user || undefined}
        setUserLanguage={newLanguage => {if (user.language !== newLanguage) setLanguage(newLanguage, user.token)}}
        setUserTargetLanguage={newTargetLanguage => {if (user.targetLanguage !== newTargetLanguage) setTargetLanguage(newTargetLanguage, user.token)}}
      />
      { user && user.language !== undefined && user.targetLanguage !== undefined &&
      <Fade timeout={4000} in={user && user.language !== undefined && user.targetLanguage !== undefined}>
        <Column horizontal='center' style={{ width:'100%', paddingTop: '350px' }}>
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
            goToPage={goToPage}
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