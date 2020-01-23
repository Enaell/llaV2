import React from 'react';
import { Column, Row } from '../common/Flexbox';
import { fullNameLanguages } from '../common/utils';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import { LanguageType } from '../common/types';
import translate from 'counterpart';


type IntroductionColumnType = {
  language: LanguageType,
  learningLanguage: LanguageType, 
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  setLearningLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  connectAsVisitor: (language: LanguageType, learningLanguage: LanguageType) => {}
}


export const IntroductionColumn = ({language, learningLanguage, setLanguage, setLearningLanguage, connectAsVisitor}: IntroductionColumnType) => {
  return (
    <>
      <Typography variant="body2" color={'initial'}>{translate('mainPage.welcomeText1')}</Typography>
      <Typography variant="body2" color={'initial'}>{translate('mainPage.welcomeText2')}</Typography>
      <Row horizontal={'space-around'}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">{translate('mainPage.language')}</InputLabel>
          <Select
            style={{minWidth: '120px'}}
            labelId="selectLanguage"
            value={language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              translate.setLocale(event.target.value as string)
              ;setLanguage(event.target.value as LanguageType)
            }}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">{translate('mainPage.learningLanguage')}</InputLabel>
          <Select
            style={{minWidth: '120px'}}
            labelId="selectLearningLanguage"
            value={learningLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setLearningLanguage(event.target.value as LanguageType)}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </Row>
      <Button onClick={()=> language && learningLanguage && connectAsVisitor(language, learningLanguage)}>{translate('connection.visitor')}</Button>

    </>
    
  )
}
