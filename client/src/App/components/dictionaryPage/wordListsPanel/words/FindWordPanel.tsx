import React, { useState, useMemo } from 'react';
import { Row, Column } from '../../../common/Flexbox';
import { WordType } from '../../../common/types';
import { CollapseWordList } from '../../../common/CardsComponents';
import { Filter } from '../../../common/GenericComponents';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';



function firstLetterSortedWords(dictionary: WordType[]) {
  
  let sortedDictionary: {[key: string]: WordType[]} = {}

  dictionary.forEach((word: WordType) => {
    if (!sortedDictionary.hasOwnProperty(word.internationalName.charAt(0)))
      sortedDictionary[word.internationalName.charAt(0)] = [];
    sortedDictionary[word.internationalName.charAt(0)].push(word);
  });
  return sortedDictionary;
}


// function subjectSortedWords(dictionary: WordType[]) {

//   let sortedDictionary: {[key: string]: WordType[]} = {}
  
//   dictionary.forEach((word: WordType) => {
//     (word.subject).forEach(subject => {
//       if (!sortedDictionary.hasOwnProperty(subject))
//         sortedDictionary[subject] = [];
//       sortedDictionary[subject].push(word);
//     });
//   })
//   return sortedDictionary;
// }

function filteredWords(words: WordType[], filter: string) {
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

function filterAddedWords(words: WordType[], wordListWordsName: string[]){
  const truc = words.filter(word=>!wordListWordsName.find((wordName=> wordName === word.name)));
  console.log('---------------------------');
  console.log(words)
  console.log(truc);
  return truc
}

export const FindWordPanel = ({path , level, words, wordListWordsName ,addWord}: {path: string, level: number | undefined, words: WordType[], wordListWordsName: string[], addWord: (word: WordType) => void}) => {
  
  const [sortedWords, setSortedWords] = useState(firstLetterSortedWords(words));
  const [filter, setFilter] = useState('');

  useMemo(()=> {console.log('=============================='); console.log(wordListWordsName);
    setSortedWords(firstLetterSortedWords(filteredWords(filterAddedWords(words, wordListWordsName), filter)))}, [ filter, words, wordListWordsName]);

  return (
    <Column>
      <Row horizontal={'center'} vertical={'center'}>
        <Filter setFilter={setFilter} filter={filter} horizontal='center' label='Search ' />
        <NavLink style={{paddingLeft: '5px', paddingRight: '5px', textDecoration: 'none'}} to={path}>
          <Button variant='text' startIcon={<PlaylistAddIcon />}>
            Create Word
          </Button>
        </NavLink>
      </Row>
      <Row wrap horizontal='space-around'> 
         {sortedWords && Object.keys(sortedWords) && Object.keys(sortedWords).map((key) => 
         <CollapseWordList style={{ marginLeft: '30px'}} key={key} listTitle={key} wordList={sortedWords[key]} onActionClick={addWord}/>) }
      </Row>
    </Column>
  )
}
