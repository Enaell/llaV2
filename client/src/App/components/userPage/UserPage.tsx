import React from 'react';
import { Fade } from '@material-ui/core';
import { Row } from '../common/Flexbox';
import {UserBoard} from './userboard/UserBoard';
import { useUserPage } from './userPageHooks';

export const UserPage = () => {

  const { user, updateUserBoard, goToPage } = useUserPage();

  return(
    <>
      { user && user.language && user.targetLanguage &&
      <Fade timeout={2000} in={user && user.language && user.targetLanguage !== undefined}>
        <Row horizontal='center' style={{ width:'100%', marginTop:'50px'}}>
          <UserBoard 
            userModules={
              user && user.userBoard ?
              {...user.userBoard}
              : {} }
            language={user.language}
            targetLanguage={user.targetLanguage}
            updateUserBoard={updateUserBoard}
            goToPage={goToPage}
          />
        </Row>
      </Fade>}
    </>
  );
}