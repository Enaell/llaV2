import React, { useState, useMemo } from 'react';
import {WordType, TranslationType, LanguageType, SentencesType, VisibilityType} from './types';
import translate from 'counterpart';
import { subjects, visibilities } from '../common/utils';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, PropTypes, Divider, ListItemSecondaryAction, IconButton, TextField, FormControlLabel, FormControl, Button, withStyles, Switch } from '@material-ui/core';
import { Column, Row } from './Flexbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { translationsToString } from './utils';
import transitions from '@material-ui/core/styles/transitions';
import Autocomplete from '@material-ui/lab/Autocomplete';

const styles = {
  marginTop15: {marginTop: '15px'}
}

export const WordCard = ({
  isAdmin=false,
  word= {} as WordType, 
  setWord = ()=> {},
  modify= false,
  elevation,
  variant= 'h1',
  wordDetailVariant='h6',
  align='center', 
  wordDetailAlign='center',
  style
  }: {
  isAdmin?: boolean,
  word?: WordType,
  setWord?: React.Dispatch<React.SetStateAction<WordType>>,
  modify?: boolean,
  elevation?: number,
  align: PropTypes.Alignment,
  variant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  wordDetailVariant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly" | undefined,
  wordDetailAlign: PropTypes.Alignment,
  style?: any 
}) => {

  const localeWordForm = 'dictionaryPage.wordListPanel.wordListForm';

  return (
    <Card elevation={ elevation || 1 } style={style}>
      <CardContent>
      {modify 
      ? <TextField
        fullWidth
        label="Caractère"
        margin="normal"
        variant="standard"
        value={word?.name}
        onChange={(e) => {
          setWord({
            ...word,
            name: e.target.value,
            internationalName: word.language !== 'Cn' ? e.target.value: word.internationalName 
          })
        }}
        name="character"
        required
      />
      : <Typography align={ align } color="textSecondary" gutterBottom>
        Caractère
      </Typography>}
      <Typography align={ align } component="h2" variant={variant} gutterBottom>
        { word?.name || ''}
      </Typography>
      {word.language !== 'Cn' && 
      <>
        {modify
        ? <TextField
          fullWidth
          label="Caractère"
          margin="normal"
          variant="standard"
          value={word?.internationalName}
          onChange={(e) => {setWord({...word, internationalName: e.target.value})}}
          name="character"
          required
        />
        : <Typography align={ align } color="textSecondary" gutterBottom>
          Pinying
        </Typography>} 
      </>}
      <Typography align={ wordDetailAlign || align } variant={wordDetailVariant} gutterBottom>
        { word?.internationalName || '' }
      </Typography>
      {modify &&
      <>
        <TextField
          style={styles.marginTop15}
          fullWidth
          type='number'
          inputProps={{ min: "0", max: "6", step: "1" }} 
          label={translate(`${localeWordForm}.level`)}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
            setWord({...word, level: event.target.value as number});
          }}
          value={word?.level}
          error={false}
        />
        <Autocomplete
          style={styles.marginTop15}
          multiple
          limitTags={8}
          options={subjects}
          getOptionLabel={(subject: string) => translate(`subjects.${subject}`)}
          value={word?.subject}
          filterSelectedOptions
          disableCloseOnSelect
          onChange={(_event, values) => {setWord({...word, subject: values})}}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              label={translate(`${localeWordForm}.subject`)}
              placeholder={translate(`${localeWordForm}.subject`)}
              error={false}
            />
          )}
        />
        <Autocomplete
          style={styles.marginTop15}
          options={visibilities}
          getOptionLabel={(visibility: string) => translate(`visibility.${visibility}`)}
          value={word?.visibility}
          filterSelectedOptions
          openOnFocus
          onChange={(_event: React.ChangeEvent<{}>, value: string | null) => setWord({...word, visibility: value as VisibilityType})}
          renderInput={(params: any) => (
            <TextField
              {...params}
              variant="standard"
              label={translate(`${localeWordForm}.visibility`)}
              placeholder={translate(`${localeWordForm}.visibility`)}
              error={false}
            />
          )}
        />
        <Row horizontal='end' style={styles.marginTop15}>
          <FormControlLabel
            control={
              <Switch
                disabled={!isAdmin}
                checked={word?.validated}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWord( {...word, validated:  event.target.checked})}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={translate(`${localeWordForm}.validation`)}
          />
        </Row>
      </>
      }
      </CardContent>
    </Card>
  );
}

export const TranslationList = ({
  translations= [],
  setWordTranslations = ([])=> {},
  modify= false,
  language,
  style={}
}: {
  translations: TranslationType[],
  setWordTranslations?: (newTranslations: TranslationType[]) => void,
  modify?: boolean,
  language: LanguageType,
  style?: any
}) => {

  return (
    <div style={{...style}}>
    {translations.map((translation) => (
    <TranslationPanel 
      key={translation.rank}
      setWordTranslation={(newT) => setWordTranslations([...translations.slice(0, translation.rank), {...translations[translation.rank], name: newT}, ...translations.slice(translation.rank + 1, translations.length)])} 
      setTranslationSentence={(newS) => setWordTranslations([...translations.slice(0, translation.rank), {...translations[translation.rank], sentences: newS}, ...translations.slice(translation.rank + 1, translations.length)])  }
      deleteTranslation={() => setWordTranslations(translations.filter(t => t.rank !== translation.rank).map((t, index) => {return {...t, rank: index}}))}
      translation={translation} 
      modify={modify}/>
    ))}
    {modify &&
    <Button
      variant='outlined'
      style={{ marginTop: '10px'}}
      fullWidth
      onClick={e => {
        e.preventDefault();
        setWordTranslations([...translations, {name: '', internationalName: '', language, sentences: [], rank: translations ? translations.length: 0}])
      }}>
        <PlaylistAddIcon style={{padding: '5px'}}/>
    </Button>}
  </div>)
}

const TranslationPanel = ({
  setWordTranslation,
  setTranslationSentence,
  deleteTranslation,
  translation,
  modify
} : {
  setWordTranslation: (newTranslation: string) => void,
  setTranslationSentence: (newSentences: SentencesType[]) => void,
  deleteTranslation: () => void,
  translation: TranslationType,
  modify: boolean
}) => {
  
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      {modify ? 
        <Row style={{width: '100%'}} vertical='center' horizontal='space-between'>
          <FormControl
            aria-label="Acknowledge"
            onClick={(event) => {event.stopPropagation()}}
            onFocus={(event) => event.stopPropagation()}
          >
            <CssTextField
              label={translation.name ? 'Tranduction': 'Nouvelle Traduction'}
              value={translation.name}
              onChange={(event) => {
                event.preventDefault();
                setWordTranslation(event.target.value);               
              }}
            />
          </FormControl>
          <div>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                deleteTranslation();
              }}
            >
              <DeleteOutlineIcon />
            </IconButton> 
          </div>
        </Row>
        : <Typography>{translation.name}</Typography>
      }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{paddingTop: '0', paddingBottom: '0'}}>
        <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
          {translation.sentences.map((sentence, index) => (
          <div key={index}>
            <Divider/>
            <SentencePanel
              modify={modify}
              saveSentence={(newSentence) => 
                setTranslationSentence([
                  ...(translation.sentences).slice(0, index),
                  newSentence,
                  ...(translation.sentences).slice(index + 1, translation.sentences.length)
                ])}
              deleteSentence={() => setTranslationSentence([...translation.sentences.slice(0, index), ...translation.sentences.slice(index + 1, translation.sentences.length)]) }
              sentence={sentence} />
          </div>))}
            {modify &&
            <Column horizontal='center' style={{width: '100%'}}>
              <Divider style={{width: '100%'}}/>
              <Button
                variant={'text'}
                style={{ marginTop: '10px', width: '46px', minWidth: 0, borderRadius: '30px'}}
                onClick={e => {
                  e.preventDefault();
                  setTranslationSentence([...(translation.sentences), {sentence: '', translatedSentence: ''}])
                }}>
                  <PlaylistAddIcon style={{padding: '5px'}}/>
              </Button> 
          </Column>}
        </List >
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const SentencePanel = ({
  modify,
  sentence,
  saveSentence,
  deleteSentence
}: {
  modify: boolean,
  sentence: SentencesType,
  saveSentence: (newSentences: SentencesType) => void,
  deleteSentence: () => void
}) => {
  return (
    <Row style={{width: '100%'}} horizontal='space-between' vertical='center'>
    {modify ? <>
      <Column style={{width: '100%'}} horizontal={'start'}>
        <CssTextField
          placeholder='Nouvelle phrase'
          fullWidth
          value={sentence.sentence}
          onChange={(event) => {
            saveSentence({sentence: event.target.value, translatedSentence: sentence.translatedSentence})
          }}
        />
        <CssTextField 
          placeholder='Traduction'
          inputProps={{ style: { opacity: '0.6', fontSize: 14}}}
          fullWidth
          value={sentence.translatedSentence}
          onChange={(event) => {
            saveSentence({sentence: sentence.sentence, translatedSentence: event.target.value})
          }}
        />
      </Column>
      <IconButton 
        style={{height:'48px'}}
        onClick={e => {
        e.preventDefault();
        deleteSentence();
      }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </>
    : <ListItemText primary={ sentence.sentence} secondary={ sentence.translatedSentence } />}
  </Row>  )
}

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#949494'
    },
    '& .MuiInput-underline:before': {
      border: 0
    }
  },
})(TextField);

export const CollapseWordList = ({
  style, 
  listTitle, 
  wordList,
  onActionClick
}: {
  style: any,
  listTitle: string, 
  wordList: WordType[],
  onActionClick: (word: WordType) => void
}) => {
  return (
    <div style={{...style}}>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{listTitle}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{paddingTop: '0', paddingBottom: '0'}}>
          <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
            {wordList.map((word) => (
            <div key={word.id || word.name} >
              <ListItem style={{minWidth: '350px'}} role={undefined} button onClick={() => {}}>
                <ListItemText
                  style={{paddingRight: '15px'}} 
                  primary= { word.name === word.internationalName ? `${word.name}` : `${word.name} - ${word.internationalName}`}
                  primaryTypographyProps={{variant:'body1'}}
                  secondary={`${translationsToString(word.translations)}`} 
                />
                <ListItemSecondaryAction >
                  <IconButton aria-label="addWord" onClick={() => onActionClick(word)}>
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </div>))}
          </List >
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
