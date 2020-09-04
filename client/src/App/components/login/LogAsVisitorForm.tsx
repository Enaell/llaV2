import React from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { InputLabel, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { LanguageType } from '../common/types';
import { fullNameLanguages, inputLanguage } from '../common/utils';

type LogAsVisitorFormType = { 
  language: LanguageType,
  targetLanguage: LanguageType, 
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>, 
  setTargetLanguage: React.Dispatch<React.SetStateAction<LanguageType>>,
  languageError: boolean,
  targetLanguageError: boolean
}

export const LogAsVisitorForm = ({
  language, 
  targetLanguage,
  setLanguage,
  setTargetLanguage,
  languageError,
  targetLanguageError
}: LogAsVisitorFormType) => {
  return (
    <Row style={{width: '100%'}} horizontal={'space-between'}>
      <FormControl error={languageError} style={{width: '45%'}}>
        <InputLabel>{translate('landingPage.language')}</InputLabel>
        <Select
          style={{ width: '100%', minWidth: '120px'}}
          labelId="selectLanguage"
          value={language}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            translate.setLocale(event.target.value as string);
            setLanguage(event.target.value as LanguageType)
          }}
        >
          {(Object.keys(fullNameLanguages) as LanguageType[])
          .filter(key => inputLanguage[key])
          .map(key => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl error={targetLanguageError} style={{width: '45%'}}>
        <InputLabel>{translate('landingPage.targetLanguage')}</InputLabel>
        <Select
          style={{ width: '100%', minWidth: '120px'}}
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