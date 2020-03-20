import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


function Translation({translation, selectAnswer}){
  return (
    <ListItem button onClick={() => {selectAnswer(translation)}}> 
      <ListItemText primary={<Typography variant="h5">{translation}</Typography>}  />
    </ListItem>

  );
}

Translation.propTypes ={
  selectAnswer: PropTypes.func.isRequired,
  translation: PropTypes.string.isRequired
}

function TranslationList ({translations, onAnswerSelected}){
  return (
    <div >
      <List component="nav">
        {translations.map((tr) => <Translation translation={tr} key={tr} selectAnswer={onAnswerSelected} />
        )}
      </List>
    </div>
  );
}

TranslationList.propTypes ={
  onAnswerSelected: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default TranslationList;