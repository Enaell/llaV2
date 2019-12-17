import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { TranslationType, WordType } from '../../../common/types';


type WordListType = {
  wordList: WordType[], 
  handleToggle: (word: WordType) => void, 
  checked: string[], 
  handleWordPreview: (word: WordType )=> void
}

export const wordItem = () => {
}

const translationsToString = (translations: TranslationType[]) => {
  let s = '';
  translations.forEach((translation, i, translations) => {
    if (Object.is(translations.length - 1, i))
      s += translation.name;
    else
      s += (translation.name + ', ');
  })
  return s;
}

export const WordList = ({ 
  wordList,
  handleToggle, 
  checked, 
  handleWordPreview 
}: WordListType) => {
  return (
    <List>
    {wordList.map((word, index) => {
      return(
        <ListItem style={{minWidth: '350px'}} key={index} role={undefined} button onClick={() => handleToggle(word)}>
          <Checkbox color={'primary'} checked={checked.indexOf(`${index}`) !== -1} tabIndex={-1} disableRipple />
          <ListItemText
            style={{paddingRight: '30px'}} 
            primary={`${word.name} - ${word.globalName}`}
            primaryTypographyProps={{variant:'body1'}}
            secondary={`${translationsToString(word.translations)}`} 
          />
          <ListItemSecondaryAction >
            <IconButton aria-label="wordPreview" onClick={() => handleWordPreview(word)}>
              <CommentIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )})
    }
    </List>
  )
}
