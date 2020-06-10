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
import { FindWordPanel } from './words/FindWordPanel';

const height = {
  minHeight: 'calc(100vh - 400px)',
  maxHeight: 'calc(100vh - 300px)',
  height: '100%'
}

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
  const { wordLists, words, createWordList, updateWordList, deleteWordList, removeWordFromWordList, addWordToWordList, createWord, saveWord } = useWordLists(user);

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
        <Row style={height}>
          <WordLists
            userConnected={user?.role !== 'Visitor'}
            path={url && `${url}`}
            wordLists={wordLists}
            onAddWordList={() => history.replace(`${url}/create`)}
            onDeleteWordList={deleteWl}
            onSortEnd={()=>{}}
          />
          <RouterSwitch>
            <Route
              exact
              path={`${url}/create`}
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
                      userConnected={user?.role !== 'Visitor'}
                      words={wordLists && wordLists[wordListName] && wordLists[wordListName].words}
                      onAddWord={() => history.replace(`${url}/${wordListName}/words/addToList`)}
                      onDeleteWord={(name: string) => {
                        removeWordFromWordList(name, wordListName);
                        if (history.location.pathname.split('/').pop() === name)
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
              exact
              path={`${url}/:wordlistname/words/addToList`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName])
                  return <FindWordPanel path={`${url}/${wordListName}/words/createAndAdd`}  level={user.levels?.find(level => level.language === user.targetLanguage)?.rank} words={words} addWord={(word: WordType) => addWordToWordList(word, wordListName)} />;
                return <div></div>
              }}
            />
            <Route 
              exact
              path={`${url}/:wordlistname/words/createAndAdd`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName]){
                  return (
                    <WordForm
                      adminRole={user.role === 'Admin'}
                      word={undefined}
                      create
                      canModify
                      wordList={wordLists[wordListName]}
                      onSave={(word) => addWordToWordList(word, wordListName)} 
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                  )
                }
                return <div></div>
              }}
            />
            <Route
              path={`${url}/:wordlistname/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName]) {
                  const word = wordLists[wordListName].words && wordLists[wordListName].words[wordName];
                  if (word)
                    return <WordForm
                      adminRole={user.role === 'Admin'}
                      word={word}
                      canModify={user.role === 'Admin' || user.username === word.owner}
                      wordList={wordLists[wordListName]}
                      onSave={(word) => addWordToWordList(word, wordListName)} 
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                }
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
