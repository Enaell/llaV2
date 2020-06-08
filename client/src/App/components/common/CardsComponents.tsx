import React from 'react';
import {WordType, HorizontalType, VariantType} from './types';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, PropTypes, Divider, ListItemSecondaryAction, IconButton, TextField } from '@material-ui/core';
import { Column } from './Flexbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import { translationsToString } from './utils';
import { SelectedWords } from '../dictionaryPage/dictionarySidePanel/SelectedWords';

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

export const WordColumn = ({
  word, 
  horizontal, 
  nameVariant, 
  internationalNameVariant 
}: {word: WordType, horizontal: HorizontalType, nameVariant: VariantType, internationalNameVariant: VariantType}) => {
  return (
    <Column horizontal={ horizontal || 'center'} >
        <Typography color="textSecondary" gutterBottom>
          Caractère
        </Typography>
        <Typography variant={ nameVariant || 'h2' } gutterBottom>
          { word.name }
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Pinying
        </Typography>
        <Typography variant= { internationalNameVariant || 'h6' } gutterBottom>
          { word.internationalName }
        </Typography>
    </Column>
  )
}

export const TranslationList = ( { word, style={} }: { word?: WordType, style?: any }) => {
  return (
    <div style={{...style}}>
    {word && word.translations && word.translations.map((translation, index) => (
      <ExpansionPanel key={translation.name}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{translation.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{paddingTop: '0', paddingBottom: '0'}}>
          <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
            {translation.sentences.map((sentence) => (
              <div key={sentence.sentence}>
                <Divider/>
                <ListItemText primary={ sentence.sentence} secondary={ sentence.translatedSentence } />
            </div>))}
          </List >
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    </div>
  )
}

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
