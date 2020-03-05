import React from 'react';
import { Column, Row } from '../common/Flexbox';
import { fullNameLanguages } from '../common/utils';
import { Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import { LanguageType } from '../common/types';
import translate from 'counterpart';


type IntroductionColumnType = {
  language: LanguageType,
  targetLanguage: LanguageType, 
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  setTargetLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  connectAsVisitor: (language: LanguageType, targetLanguage: LanguageType) => {}
}


export const IntroductionColumn = ({language, targetLanguage, setLanguage, setTargetLanguage, connectAsVisitor}: IntroductionColumnType) => {
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
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">{translate('mainPage.targetLanguage')}</InputLabel>
          <Select
            style={{minWidth: '120px'}}
            labelId="selectTargetLanguage"
            value={targetLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setTargetLanguage(event.target.value as LanguageType)}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </Row>
      <Button onClick={()=> language && targetLanguage && connectAsVisitor(language, targetLanguage)}>{translate('connection.visitor')}</Button>

    </>
    
  )
}
