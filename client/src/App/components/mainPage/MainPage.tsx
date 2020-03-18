import React, { useState, useRef } from 'react';
import { Button, Fade } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import { UserType, LanguageType, UserModulesType, BreakpointType } from '../common/types';
import {WelcomeSection} from './WelcomeSection';
import {UserBoard} from './UserBoard';
import { ModifyPanel } from './ModifyPanel';

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

  const [marginWidth, setMarginWidth] = useState(150);

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

  function onBpChange(bp: BreakpointType){
    if (bp === 'lg')
      setMarginWidth(110);
    if (bp === 'md')
      setMarginWidth(90);
    if (bp === 'sm')
      setMarginWidth(70);
    if (bp === 'xs')
      setMarginWidth(50);
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
        <Row horizontal='center' style={{ width:'100%', paddingTop: '350px' }}>
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
            handleBreakpointChange={onBpChange}
            marginLeft={marginWidth}
          />
          <ModifyPanel
            squareSide={marginWidth} 
            onModify={onModify}
            setOnModify={setOnModify}
            saveModules={saveAndStopModify}
            cancelModification={() => setOnModify(false)}
          />
        </Row>
      </Fade>}
    </>
  );
}

export default MainPage;