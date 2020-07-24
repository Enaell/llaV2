import React from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { InputLabel, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { LanguageType } from '../common/types';
import { fullNameLanguages } from '../common/utils';

type LogAsVisitorFormType = { 
  language: LanguageType,
  targetLanguage: LanguageType, 
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  setTargetLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
}

export const LogAsVisitorForm = ({
  language, 
  targetLanguage,
  setLanguage,
  setTargetLanguage,
}: LogAsVisitorFormType) => {
  return (
    <Row horizontal={'space-around'}>
      <FormControl>
        <InputLabel>{translate('mainPage.language')}</InputLabel>
        <Select
          style={{minWidth: '120px'}}
          labelId="selectLanguage"
          value={language}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            translate.setLocale(event.target.value as string);
            setLanguage(event.target.value as LanguageType)
          }}
        >
          {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>{translate('mainPage.targetLanguage')}</InputLabel>
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
  )
}