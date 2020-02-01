import React, { useState } from 'react';
import { Button, Select, MenuItem, Fade } from '@material-ui/core';
import translate from 'counterpart';
import { Column, Row } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents';
import { UserType, LanguageType, UserModulesType } from '../common/types';
import {WelcomeSection} from './WelcomeSection';
import {UserBoard} from './UserBoard';


const MainPage = ({user, onLogin, onSignin, connectAsVisitor,  tabNumber, changeTabNumber, updateUserBoard, history }
  : {
    user: UserType,
    onLogin: (emailAddress: string, password: string) => {}, 
    onSignin: (username: string, emailAddress: string, password: string) => {},
    connectAsVisitor: (language: LanguageType, learningLanguage: LanguageType) => {},
    tabNumber: number,
    changeTabNumber: (num: number) => void,
    updateUserBoard: (userBoard: UserModulesType) => void,
    history: any
  }) => {

  const [onModify, setOnModify] = useState(false);

  const [newUserModules, setNewUserModules] = useState(user.userBoard);

  const handleOnCardTrainingClick = () => {
    history.push('/cardTraining');  
  }

  const handleOnDictionaryClick = () => {
    history.push('/dictionary');
  }

  console.log('================================')
  console.log(user.userBoard);

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
          <UserBoard onModify={onModify} setNewUserModules={setNewUserModules} userModules={user && user.userBoard ? user.userBoard : {} } />
          { !onModify && 
            <Button onClick={()=> setOnModify(true) }>
              Modify
            </Button>
          }
          { onModify &&
            <Row>
              <Button onClick={()=> setOnModify(false) }>
                  Cancel
              </Button>
              <Button onClick={()=> {
                // setOnModify(false); 
                if (newUserModules) 
                  updateUserBoard(newUserModules)} 
                }>
                  Save
              </Button>
            </Row>
          }
        </Column>
      </Fade>
    </>
  );
}

export default MainPage;