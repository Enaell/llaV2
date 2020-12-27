import React from 'react';
import { Row } from '../common/Flexbox';
import { Route } from 'react-router-dom';
import { WordListsPanel } from './wordListsPanel/WordListsPanel';
import { DictionaryPanel } from './dictionaryPanel/DictionaryPanel';


const DictionaryPage = () => {

  return(

      <Row horizontal='center'>
        <Route
          key={'dictionary_wordlists'}
          path={'/dictionary/wordlists'}
          render={props => <WordListsPanel {...props} />}
        />
        <Route
          key={'dictionary'}
          path={'/dictionary/words'}
          render={ props => <DictionaryPanel {...props} />}
        />
      </Row>
    );
}

export default DictionaryPage;