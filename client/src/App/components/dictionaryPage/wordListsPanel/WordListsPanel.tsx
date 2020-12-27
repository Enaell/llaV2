import React from 'react';
import { Switch as RouterSwitch } from 'react-router-dom'
import { UserType, WordListType, WordType } from '../../common/types';
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import translate from 'counterpart';
import { Route } from 'react-router-dom';
import { WordLists } from './wordLists';
import { Words } from './words';
import { useWordLists } from './wordListshook';
import { WordListForm } from './wordLists/WordListForm';
import { WordForm } from './words/WordForm';
import { FindWordPanel } from './words/FindWordPanel';

const height = {
  minHeight: 'calc(100vh - 300px)',
  maxHeight: 'calc(100vh - 200px)',
  height: '100%'
}

type WordListsPanelType = {
  history: any;
  match: any;
};

export const WordListsPanel = ({match, history}: WordListsPanelType) => {
  const { 
    user, 
    wordLists, 
    words, 
    createWordList, 
    updateWordList, 
    deleteWordList, 
    removeWordFromWordList, 
    addWordToWordList, 
    createWordInWordList, 
    updateWord 
  } = useWordLists();

  async function createWlAndUpdatePath(newWordLists: WordListType) {
    const newWlStatus = await createWordList(newWordLists);
    history.replace(`${match.url}/${newWordLists.name}`);
    return newWlStatus;
  }

  async function updateWlAndPath(newWordLists: WordListType, wordListOldName?: string | undefined) {
    const newWlStatus = await updateWordList(newWordLists, wordListOldName);
    history.replace(`${match.url}/${newWordLists.name}`)
    return newWlStatus;
  }

  async function deleteWl(wordList: WordListType){
    const newWlStatus = await deleteWordList(wordList);
    history.replace(`${match.url}/`);
    return newWlStatus;
  }

  async function updateWordAndPath (newWord: WordType, wordListName: string, wordName: string) {
    const newWStatus = await updateWord(newWord, wordListName, wordName);
    history.replace(`${match.url}/${wordListName}/words/${newWord.name}`);
    return newWStatus;
  }

  return(
    <Column horizontal='center' style={ {width:'100%'} }>
      <div style={{ width:'80%', maxWidth: '1800px'}}>
        <Typography variant='h4'>{translate('dictionaryPage.wordListPanel.title')}</Typography>
        <Row style={height}>
          <WordLists
            userConnected={user?.role !== 'Visitor'}
            path={match.url && `${match.url}`}
            wordLists={wordLists}
            onAddWordList={() => history.replace(`${match.url}/create`)}
            onDeleteWordList={deleteWl}
            onSortEnd={()=>{}}
          />
          <RouterSwitch>
            <Route
              exact
              path={`${match.url}/create`}
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
              path={`${match.url}/:wordlistname`}
              render={({ match: {params: {wordlistname}} }) => {
                if (wordLists && wordLists[wordlistname])
                  return (
                    <Words
                      path={`${match.url}/${wordlistname}/words`}
                      userConnected={user?.role !== 'Visitor'}
                      words={wordLists && wordLists[wordlistname] && wordLists[wordlistname].words}
                      onAddWord={() => history.replace(`${match.url}/${wordlistname}/words/addToList`)}
                      onDeleteWord={(name: string) => {
                        removeWordFromWordList(name, wordlistname);
                        if (history.location.pathname.split('/').pop() === name)
                          history.replace(`${match.url}/${wordlistname}`);
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
              path={`${match.url}/:wordlistname/words/addToList`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName])
                  return <FindWordPanel 
                      path={`${match.url}/${wordListName}/words/createAndAdd`}  
                      level={user.levels?.find(level => level.language === user.targetLanguage)?.rank} 
                      words={words}
                      wordListWordsName={Object.keys(wordLists[wordListName].words)}
                      addWord={(word: WordType) => addWordToWordList(word, wordListName)}
                    />;
                return <div></div>
              }}
            />
            <Route 
              exact
              path={`${match.url}/:wordlistname/words/createAndAdd`}
              render={({ match }) => {
                const wordListName = String(match.params.wordlistname);
                if (user.role !== 'Visitor' && wordLists && wordLists[wordListName]){
                  return (
                    <WordForm
                      isAdmin={user.role === 'Admin' || user.role==='Moderator'}
                      isOwner={true}
                      word={undefined}
                      create
                      onSave={(newWord) => createWordInWordList(newWord, wordListName)}
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                  )
                }
                return <div></div>
              }}
            />
            <Route
              path={`${match.url}/:wordlistname/words/:wordname`}
              render={({ match }) => {
                const wordName = String(match.params.wordname);
                const wordListName = String(match.params.wordlistname);
                if (wordLists && wordLists[wordListName]) {
                  const word = wordLists[wordListName].words && wordLists[wordListName].words[wordName];
                  if (word)
                    return <WordForm
                      isAdmin={user.role === 'Admin' || user.role==='Moderator'}
                      isOwner={user.username === word.owner}
                      word={word}
                      create={false}
                      onSave={(newWord) => updateWordAndPath(newWord, wordListName, wordName) } 
                      language={user.language}
                      targetLanguage={user.targetLanguage}
                    />
                }
                return (<div></div>)
              }}
            />
            <Route
              exact
              path={`${match.url}/:wordlistname`}
              render={({ match: {params: {wordlistname}} }) => {
                if (wordLists && wordLists[wordlistname]) {
                  return ( 
                    <WordListForm
                      adminRole={user.role === 'Admin' || user.role === 'Moderator'}
                      wordList={wordLists[wordlistname]}
                      canModify={user.role === 'Admin' || user.role === 'Moderator' || wordLists[wordlistname].owner === user.username}
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
