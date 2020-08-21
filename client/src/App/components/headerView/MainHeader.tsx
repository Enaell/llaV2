import React from 'react';

import { Row, Column } from "../common/Flexbox"
import { Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import translate from 'counterpart';
import { LanguageType, UserType } from "../common/types"
import { fullNameLanguages } from "../common/utils"
import { withRouter } from 'react-router-dom';

type MainHeaderType = {
  user: UserType | undefined;
  setUserLanguage: (language: LanguageType) => void;
  setUserTargetLanguage: (language: LanguageType) => void;
  history: any;
  match: any;
  location: {
    pathname: string
    search: string
    hash: string
    state:any
  }
}

export const MainHeader = withRouter(({user, setUserLanguage, setUserTargetLanguage, location}: MainHeaderType) => {
  return (
  <Row style={{width: '100%'}} vertical={'center'}>
    <Column style={{width: '49%'}}>
      { location.pathname.split('/')[1] ?
        <Typography color={'primary'} variant={'h3'}>{translate(`${location.pathname.split('/')[1]}Page.title`)}</Typography>
      : 
      <>
        <Typography color={'primary'} variant={'h3'}>{user?.username}</Typography>
        <Typography variant={'h6'}>{translate('landingPage.level')}:{user?.levels?.find(level => level.language === user.targetLanguage)?.rank}</Typography>
      </>}
    </Column>
    <Column style={{width: '49%'}} horizontal={'end'}>
      <>
        <FormControl>
          <InputLabel>{translate('landingPage.language')}</InputLabel>
          <Select
            style={{minWidth: '120px'}}
            labelId="selectLanguage"
            value={user?.language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setUserLanguage(event.target.value as LanguageType)
            }}
          >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>{translate('landingPage.targetLanguage')}</InputLabel>
          <Select
            style={{minWidth: '120px'}}
            labelId="selectTargetLanguage"
            value={user?.targetLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setUserTargetLanguage(event.target.value as LanguageType)
            }}                  >
            {Object.keys(fullNameLanguages).map((key) => <MenuItem key={key} value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </>
    </Column>
  </Row>)
});