import React, { useState, useMemo } from 'react';
import { Row, Column } from '../../../common/Flexbox';
import { WordType } from '../../../common/types';
import CollapseList from '../../tabs/collapseList';
import { CollapseWordList } from '../../../common/CardsComponents';
import { Filter } from '../../../common/GenericComponents';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

// function firstLetterSortedWords (words: WordType[]) {
//   const initialValue: {[key: string]: WordType[]} = {}
//   console.log('===========================================');
//   console.log('firstLetterSortedWords');
//   console.log(words);
//   const truc =  words.reduce((obj, word) => {
//     return {
//       ...obj,
//       [word.internationalName.charAt(0)]: [...obj[word.internationalName.charAt(0)], word]
//     };
//   }, initialValue);
//   console.log(truc);
//   return truc;
// };

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

function filteredWords (words: WordType[], filter: string) {
  if (filter && filter.length > 0) {
    return (
      words &&
      words.filter(word => {
        const rgxp = new RegExp(filter.toLowerCase());
        const wordName = word.name.toLowerCase();
        const wordinternationalName = word.internationalName.toLowerCase();
        return wordName.match(rgxp) || wordinternationalName.match(rgxp);
      })
    );
  }
  return words;
};

export const FindWordPanel = ({path , level, words, addWord}: {path: string, level: number | undefined, words: WordType[], addWord: (word: WordType) => void}) => {
  
  const [sortedWords, setSortedWords] = useState(firstLetterSortedWords(words));
  const [filter, setFilter] = useState('');

  useMemo(()=> {setSortedWords(firstLetterSortedWords(filteredWords(words, filter)))}, [ filter, words]);

  return (
    <Column>
      <Row horizontal={'center'}>
        <Filter setFilter={setFilter} filter={filter} horizontal='center' label='Search ' />
        <Button >Create Words</Button>
        <NavLink to={path}>Create Words</NavLink>
      </Row>
      <Row wrap horizontal='space-around'> 
         {sortedWords && Object.keys(sortedWords) && Object.keys(sortedWords).map((key) => 
        //  <CollapseList horizontal='center'  style={{ margin: '15px'}} key={key} listTitle={key} wordList={sortedWords[key]} />) }
         <CollapseWordList style={{ marginLeft: '30px'}} key={key} listTitle={key} wordList={sortedWords[key]} onActionClick={addWord}/>) }
      </Row>
    </Column>
  )
}