import React, { useEffect, useState, useMemo } from 'react';
import { UserType, WordType } from '../../common/types';
import { Row } from '../../common/Flexbox';
import { CollapseWordList } from '../../common/CardsComponents';
import { dictionaryApi } from '../../../apiClient/ApiClient';
import { WordForm } from '../wordListsPanel/words/WordForm';


type WordListsPanelType = {
  user: UserType;
  history: any;
  match: any;
}

const firstLetterSortedWords = (dictionary: WordType[]) => {
  
  let sortedDictionary: {[key: string]: WordType[]} = {}

  dictionary.forEach((word: WordType) => {
    if (!sortedDictionary.hasOwnProperty(word.internationalName.charAt(0)))
      sortedDictionary[word.internationalName.charAt(0)] = [];
    sortedDictionary[word.internationalName.charAt(0)].push(word);
  });
  return sortedDictionary;
}


const subjectSortedWords = (dictionary: WordType[]) => {

  let sortedDictionary: {[key: string]: WordType[]} = {}
  
  dictionary.forEach((word: WordType) => {
    (word.subject).forEach(subject => {
      if (!sortedDictionary.hasOwnProperty(subject))
        sortedDictionary[subject] = [];
      sortedDictionary[subject].push(word);
    });
  })
  return sortedDictionary;
}

export const DictionaryPanel = ({user, history, match}: WordListsPanelType) => {

  const [words, setWords] = useState([] as WordType[])
  const [sortedWords, setSortedWords] = useState({} as {[key: string]: WordType[]});
  const [sortFunction, setSortFunction] = useState(() => firstLetterSortedWords);

  useEffect(() => {
    dictionaryApi.getAllWords(user.targetLanguage, user.token).then((w: WordType[]) => {setWords(w)});
  }, [user.token]);

  useMemo(() => {setSortedWords(sortFunction(words))}, [words])

  return (
    <Row horizontal='space-around' width='80%' style={{ maxWidth: '1800px'}}>
      <Row wrap horizontal='space-around'>
        {sortedWords && Object.keys(sortedWords) && Object.keys(sortedWords).map((key) => 
        <CollapseWordList style={{ marginLeft: '30px'}} key={key} listTitle={key} wordList={sortedWords[key]} onActionClick={()=> {}}/>) }
      </Row>
      <WordForm language={user.language} targetLanguage={user.targetLanguage} word={undefined} onSave={()=>{}}/>
    </Row>
  )
}