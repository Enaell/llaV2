import React from 'react';
import { Switch as RouterSwitch } from 'react-router-dom'
import { TranslationType, UserType } from '../../common/types';
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import translate from 'counterpart';
import { Route } from 'react-router-dom';
import { WordLists } from './wordLists';
import { Words } from './words';
import { useWordLists } from './useWordLists';
import { WordListForm } from './wordLists/WordListForm';
import { WordForm } from './words/WordForm';


type WordListsPanelType = {
  user: UserType;
  history: any;
  match: any;
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

export const WordListsPanel = ({ history, user, ...props}: WordListsPanelType) => {

  const { wordLists, createWordList, createWord, saveWordList, saveWord } = useWordLists(user);

  const { url } = props.match;

  return(
    <div style={{ paddingLeft: '20px'}}>
    <Column>
        <Typography variant='h4'>{translate('dictionaryPage.wordListPanel.title')}</Typography>
      <Row>
        <WordLists
          path={url && `${url}`}
          wordLists={wordLists}
          onAddWordList={() => history.replace(`${url}/wordlist-create`)}
          onDeleteWordList={name => {}}
          onSortEnd={()=>{}}
        />
        <RouterSwitch>
          <Route
            exact
            path={`${url}/wordlist-create`}
            render={() => {
              return <WordListForm onSave={createWordList} />;
            }}
          />
          <Route
            path={`${url}/:wordlistname`}
            render={({ match }) => {
              const wordListName = String(match.params.wordlistname);
              return (
                <Words
                  path={`${url}/${wordListName}/words`}
                  words={wordLists && wordLists[wordListName] && wordLists[wordListName].words}
                  onAddWord={() => history.replace(`${url}/${wordListName}/word-create`)}
                  onDeleteWord={(name: string | undefined) => {
                    history.replace(`${url}/${wordListName}`);
                  }}
                  onSortEnd={() => {}}
                />
              );
            }}
          />
        </RouterSwitch>
        <div style={{ display: 'flex', width: '100%', marginLeft: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Route
              path={`${url}/:wordlistname/word-create`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                return <WordForm wordList={wordLists[wordListName]} onSave={createWord} />;
              }}
            />
            <Route
              exact
              path={`${url}/:wordlistname`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                return <WordListForm wordList={wordLists[wordListName]} onSave={saveWordList} />;
              }}
            />
            <Route
              path={`${url}/:wordlistname/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.wordlistname);
                // to edit with better way to index words in wordlist
                return <WordForm wordList={wordLists[wordListName]} word={wordLists[wordListName].words[wordName]} onSave={saveWord} />;
              }}
            />
          </div>
        </div>
      </Row>
    </Column>
  </div>
)
}
