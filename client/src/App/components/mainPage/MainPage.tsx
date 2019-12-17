import React from 'react';
import { Button } from '@material-ui/core';
import translate from 'counterpart';
import { Column } from '../common/Flexbox';
import  { PageTitle }  from '../common/GenericComponents'


const MainPage = ({ onLoginClick, history }: {onLoginClick: () => {}, history: any}) => {

  const handleOnCardTrainingClick = () => {
    history.push('/cardTraining');  
  }

  const handleOnDictionaryClick = () => {
    history.push('/dictionary');
  }

  return(
    <Column horizontal='center'>
      <PageTitle title={translate('mainPage.title')} ></PageTitle>
      <Button onClick={onLoginClick}> {translate('connection.login')}</Button>
      <Button onClick={handleOnDictionaryClick}>
        Dictionary
      </Button>
      <Button onClick={handleOnCardTrainingClick}>
        Card Training
      </Button>
    </Column>
  );
}

export default MainPage;