import React from 'react';
import { Row } from '../common/Flexbox';
import { fullNameLanguages } from '../common/utils';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import { LanguageType } from '../common/types';
import translate from 'counterpart';


export const IntroductionColumn = () => {
  return (
    <>
      <Typography variant="body2" color={'initial'}>{translate('mainPage.welcomeText1')}</Typography>
      <Typography style={{paddingTop:'10px'}} variant="body2" color={'initial'}>{translate('mainPage.welcomeText2')}</Typography>
    </>    
  )
}
