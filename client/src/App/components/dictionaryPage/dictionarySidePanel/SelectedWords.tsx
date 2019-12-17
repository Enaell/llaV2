import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { TranslationType, WordType } from '../../common/types';


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

export const SelectedWords = ({ 
  wordList, handleWordPreview 
} : { wordList: WordType[], handleWordPreview: (word: WordType) => void }) => {
  
  return (
    <List>
    {wordList.map((word, index) => {
      return(
        <ListItem style={{minWidth: '350px'}} key={index} role={undefined} button onClick={() => handleWordPreview(word)}>
         <ListItemText
            style={{paddingRight: '30px'}} 
            primary={`${word.name} - ${word.globalName}`}
            primaryTypographyProps={{variant:'body1'}}
            secondary={`${translationsToString(word.translations)}`}
          />
        </ListItem>
      )})
    }
    </List>
  )
}
