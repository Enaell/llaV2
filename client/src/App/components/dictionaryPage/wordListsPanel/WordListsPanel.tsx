import React from 'react';
import { Switch as RouterSwitch } from 'react-router-dom'
import { TranslationType, UserType, WordListType, WordType } from '../../common/types';
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
  setNewWords: (newWords: {[key: string]: WordType}) => void,
  setNewWordLists: (newWordLists: {[key: string]: WordListType}) => void
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
  const { url } = props.match;
  const { wordLists, createWordList, updateWordList, deleteWordList, createWord, saveWord } = useWordLists(user);

  async function createWlAndUpdatePath(newWordLists: WordListType) {
    const newWlStatus = await createWordList(newWordLists);
    history.replace(`${url}/${newWordLists.name}`);
    return newWlStatus;
  }

  async function updateWlAndPath(newWordLists: WordListType, wordListOldName?: string | undefined) {
    const newWlStatus = await updateWordList(newWordLists, wordListOldName);
    history.replace(`${url}/${newWordLists.name}`)
    return newWlStatus;
  }

  async function deleteWl(wordList: WordListType){
    const newWlStatus = await deleteWordList(wordList);
    history.replace(`${url}/`);
    return newWlStatus;
  }

  return(
    <Column horizontal='center' style={ {width:'100%'} }>
      <div style={{ width:'80%', maxWidth: '1800px'}}>
        <Typography variant='h4'>{translate('dictionaryPage.wordListPanel.title')}</Typography>
        <Row>
          <WordLists
            userConnected={user.role && user.role !== 'Visitor'}
            path={url && `${url}`}
            wordLists={wordLists}
            onAddWordList={() => history.replace(`${url}/wordlist-create`)}
            onDeleteWordList={deleteWl}
            onSortEnd={()=>{}}
          />
          <RouterSwitch>
            <Route
              exact
              path={`${url}/wordlist-create`}
              render={() => {
                if (user.role !== 'Visitor')
                  return (
                    <WordListForm
                      adminRole={user.role === 'Admin' || user.role === 'Moderator'}
                      create
                      onSave={createWlAndUpdatePath}
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />)
                return <div></div>
              }}
            />
            <Route
              path={`${url}/:wordlistname`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName])
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
                return (<div></div>)
              }}
            />
          </RouterSwitch>
          <RouterSwitch>
            <Route
              path={`${url}/:wordlistname/word-create`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName])
                  return <WordForm wordList={wordLists[wordListName]} onSave={createWord} />;
                return <div></div>
              }}
            />
            <Route
              path={`${url}/:wordlistname/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName] && wordLists[wordListName].words && wordLists[wordListName].words[wordName])
                  return <WordForm wordList={wordLists[wordListName]} word={wordLists[wordListName].words[wordName]} onSave={saveWord} />;
                return (<div></div>)
              }}
            />
            <Route
              exact
              path={`${url}/:wordlistname`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName]) {
                  return ( 
                    <WordListForm
                      adminRole={user.role === 'Admin' || user.role === 'Moderator'}
                      wordList={wordLists[wordListName]}
                      canModify={user.role === 'Admin' || user.role === 'Moderator' || wordLists[wordListName].owner === user.username}
                      onSave={updateWlAndPath}
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                  );
                } 
                return <div></div>
              }}
            />
          </RouterSwitch>
        </Row>
      </div>
    </Column>
  )
}
