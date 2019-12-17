import React from 'react';
import {WordType, HorizontalType, VariantType} from './types';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, PropTypes } from '@material-ui/core';
import { Column } from './Flexbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const WordCard = ({ 
    word, 
    elevation, 
    align, 
    wordDetailAlign,
    style
  }: {word: WordType, elevation?: number, align: PropTypes.Alignment, wordDetailAlign: PropTypes.Alignment, style: any }) => {
  return (
    <Card elevation={ elevation || 1 } style={style}>
      <CardContent>
          <Typography align={ align } color="textSecondary" gutterBottom>
            Caractère
          </Typography>
          <Typography align={ wordDetailAlign || align } component="h2" variant="h1" gutterBottom>
            { word.name }
          </Typography>
          <Typography align={ align } color="textSecondary" gutterBottom>
            Pinying
          </Typography>
          <Typography align={ wordDetailAlign || align } variant="h6" gutterBottom>
            { word.globalName }
          </Typography>
      </CardContent>
    </Card>
  );
}

export const WordColumn = ({
  word, 
  horizontal, 
  nameVariant, 
  globalNameVariant 
}: {word: WordType, horizontal: HorizontalType, nameVariant: VariantType, globalNameVariant: VariantType}) => {
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
        <Typography variant= { globalNameVariant || 'h6' } gutterBottom>
          { word.globalName }
        </Typography>
    </Column>
  )
}

export const TranslationList = ( { word }: { word: WordType }) => {
  return (
    <div style={{margin: '20px 0'}}>
    {word && word.translations && word.translations.map((translation) => (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{translation.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
    
        <List >
          {translation.sentences.map((sentence) => (
            <ListItem >
              <ListItemText primary={ sentence.sentence} secondary={ sentence.translatedSentence } />
            </ListItem>
          ))}
        </List >
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ))}
    </div>
  )
}
