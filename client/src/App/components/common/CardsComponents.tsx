import React, { useState, useMemo } from 'react';
import {WordType, HorizontalType, VariantType, TranslationType, LanguageType, SentencesType} from './types';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, PropTypes, Divider, ListItemSecondaryAction, IconButton, TextField, FormControlLabel, FormControl, Button, withStyles } from '@material-ui/core';
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
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { translationsToString } from './utils';
import { SelectedWords } from '../dictionaryPage/dictionarySidePanel/SelectedWords';
import { isNullOrUndefined } from 'util';

export const WordCard = ({ 
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
  return (
    <Card elevation={ elevation || 1 } style={style}>
      <CardContent>
      {modify ? <TextField
          label="Caractère"
          margin="normal"
          variant="standard"
          value={word?.name}
          onChange={(e) => {setWord({...word, name: e.target.value})}}
          name="character"
          required
        />:

          <Typography align={ align } color="textSecondary" gutterBottom>
            Caractère
          </Typography>}
          <Typography align={ align } component="h2" variant={variant} gutterBottom>
            { word?.name || ''}
          </Typography>
          {modify ? <TextField
          label="Caractère"
          margin="normal"
          variant="standard"
          value={word?.internationalName}
          onChange={(e) => {setWord({...word, internationalName: e.target.value})}}
          name="character"
          required
        />
        :
          <Typography align={ align } color="textSecondary" gutterBottom>
            Pinying
          </Typography>}
          <Typography align={ wordDetailAlign || align } variant={wordDetailVariant} gutterBottom>
            { word?.internationalName || '' }
          </Typography>
      </CardContent>
    </Card>
  );
}

export const TranslationList = ({
  word,
  setWord = ()=> {},
  modify= false,
  language,
  style={}
}: {
  word?: WordType,
  setWord?: React.Dispatch<React.SetStateAction<WordType>>,
  modify?: boolean,
  language: LanguageType,
  style?: any
}) => {

  const [newTranslation, setNewTranslation] = useState(undefined as TranslationType | undefined)

  const [translations, setTranslations] = useState(word?.translations);

  useMemo(() => {setTranslations(word?.translations)}, [word?.translations])

  return (
    <div style={{...style}}>
    {word && word.translations && word.translations.map((translation, index) => (
      <TranslationPanel translation={translation} modify={modify}/>
    ))}
    {modify && <>
    {newTranslation ?
      <TranslationPanel translation={newTranslation} modify/>
      : <AddButton 
      fullWidth
      setFunction={setNewTranslation} 
      obj={{
        name: '',
        internationalName: '',
        language: language,
        sentences: [],
        rank: translations ? translations.length : 0,
      }}/>}
      </>}
    </div>
  )
}

const TranslationPanel = ({translation, modify} : {translation: TranslationType, modify: boolean}) => {
  
  const [newSentence, setNewSentence] = useState(undefined as SentencesType | undefined)

  return (
    <ExpansionPanel key={translation.name}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      {modify ? 
        <Row style={{width: '100%'}} vertical='center' horizontal='space-between'>
          <FormControl
            aria-label="Acknowledge"
            onClick={(event) => {event.stopPropagation()}}
            onFocus={(event) => event.stopPropagation()}
          >
            <TextField value={translation.name}/>
          </FormControl>
          <IconButton style={{padding:'5px'}}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <DeleteOutlineIcon />
          </IconButton> 
        </Row>
        : <Typography>{translation.name}</Typography>
      }
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{paddingTop: '0', paddingBottom: '0'}}>
        <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
          {translation.sentences.map((sentence) => (
          <div key={sentence.sentence}>
            <Divider/>
            <SentencePanel modify={modify} sentence={sentence} />
          </div>))}
          {modify && <>
    {newSentence ?
          <div>
          <Divider/>
          <SentencePanel sentence={newSentence} modify />
        </div>
    : <AddButton setFunction={setNewSentence} obj={{sentence: '', translatedSentence: ''}}/>}
      </>}
        </List >
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const SentencePanel = ({modify, sentence}: {modify: boolean, sentence: SentencesType}) => {
  return (
    <Row style={{width: '100%'}} horizontal='space-between' vertical='center'>
    {modify ? <>
      <Column style={{width: '100%'}} horizontal={'start'}>
        <CssTextField placeholder='Nouvelle phrase' fullWidth value={sentence.sentence}/>
        <CssTextField placeholder='Traduction' inputProps={{ style: { opacity: '0.6', fontSize: 14}}} fullWidth value={sentence.translatedSentence}/>
      </Column>
      <IconButton 
        style={{height:'48px'}}
        onClick={e => {
        e.preventDefault();
      }}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </>
    : <ListItemText primary={ sentence.sentence} secondary={ sentence.translatedSentence } />}
  </Row>  )
}

const AddButton = ({setFunction, obj, fullWidth=false}: {setFunction: any, obj: any, fullWidth?: boolean}) => {
  const notFullWidth = !fullWidth && {width: '46px', minWidth: 0, borderRadius: '30px'};
  return(
    <Row style={{width: '100%'}} horizontal='center'>
    <Button
          variant='outlined'
          style={{ marginTop: '10px', ...notFullWidth}}
          fullWidth={fullWidth}
          onClick={e => {
            e.preventDefault();
            setFunction(obj);
          }}>
            <AddIcon style={{padding: '5px'}}/>
        </Button>
      </Row>)
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
            <div key={word.name} >
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
