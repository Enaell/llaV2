import React from 'react';
import PropTypes from 'prop-types';
import CharacterCard from './CharacterCard/CharacterCard';
import TranslationList from './TranslationList/TranslationList';

function Turn({card, translations, highlight, onAnswerSelected}) {
  
  function highlightToBgColor(highlight){
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red',
    }
    return mapping[highlight];
  }

  return(
    <div className="row turn" style={{backgroundColor:highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <CharacterCard {...card}/>
      </div>
      <div className="col-6">
        <TranslationList translations={translations} onAnswerSelected={onAnswerSelected} />
      </div>
    </div>
  );
}

Turn.propTypes = {
  card: PropTypes.shape({
    character: PropTypes.string.isRequired,
    pinying: PropTypes.string.isRequired,
    translations: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.string
  }),
  onAnswerSelected: PropTypes.func.isRequired,
  translations: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired
}

export default Turn;