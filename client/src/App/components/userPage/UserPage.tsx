import React from 'react';
import { Fade } from '@material-ui/core';
import { Row } from '../common/Flexbox';
import { UserType, LanguageType, UserModulesType } from '../common/types';
import {UserBoard} from './userboard/UserBoard';

export const UserPage = ({user, updateUserBoard, history }: {
    user: UserType,
    updateUserBoard: (userBoard: UserModulesType, token: string | undefined) => Promise<void>,
    setLanguage: (language: LanguageType, token: string | undefined) => void,
    setTargetLanguage: (targetLanguage: LanguageType, token: string | undefined) => void,
    history: any
  }) => {
  function goToPage (url: string) {
    history.push(url)
  }

  async function updateBoard(userBoard: UserModulesType) {
    await updateUserBoard(userBoard, user.token)
  }


  return(
    <>
      { user && user.language !== undefined && user.targetLanguage !== undefined &&
      <Fade timeout={2000} in={user && user.language !== undefined && user.targetLanguage !== undefined}>
        <Row horizontal='center' style={{ width:'100%'}}>
          <UserBoard 
            userModules={
              user && user.userBoard ?
              {...user.userBoard}
              : {} }
            updateUserBoard={updateBoard}
            goToPage={goToPage}
          />
        </Row>
      </Fade>}
    </>
  );
}