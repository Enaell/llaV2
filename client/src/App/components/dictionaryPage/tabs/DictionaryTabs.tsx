import React, {useState, useEffect} from 'react';
import { Column } from '../../common/Flexbox';
import translate from 'counterpart';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrderList from './OrderList';
import { Filter, DualSwitch } from '../../common/GenericComponents';
import { WordType } from '../../common/types';

const firstLetterSortedDictionary = (dictionary: WordType[]) => {
  
  let sortedDictionary: {[key: string]: WordType[]} = {}

  dictionary.forEach((word: WordType) => {
    if (!sortedDictionary.hasOwnProperty(word.internationalName.charAt(0)))
      sortedDictionary[word.internationalName.charAt(0)] = [];
    sortedDictionary[word.internationalName.charAt(0)].push(word);
  });
  return sortedDictionary;
}

const subjectSortedDictionary = (dictionary: WordType[]) => {

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

const alphabeticSort =  (a: WordType, b: WordType) => a.internationalName > b.internationalName ? 1 : -1;

const levelSort = (a: WordType, b: WordType) => a.level > b.level ? 1 : -1;

const filteredWords = (words: WordType[], filter: string) => {

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


const DictionaryTabs = ({ words }: { words: WordType[] }) =>{

  const alphabeticOrderText: string = translate('dictionaryPage.alphabeticOrder');
  const levelOrderText: string = translate('dictionaryPage.levelOrder');

  const switchValues = [alphabeticOrderText, levelOrderText];

  const sortBySwitchValue: {[key: string]: (a: WordType, b: WordType) => number} = {
    alphabeticOrderText: alphabeticSort,
    levelOrderText: levelSort
  }

  const [dictionary, setDictionary] = useState(words);

  const [filter, setFilter] = useState('');

  const handleSubFunctionChange = (value: string) => {
    setDictionary(dictionary.sort(sortBySwitchValue[value]));
  }

  useEffect(() => {
    setDictionary(filteredWords(words, filter))
  }, [filter, words]);

  const [tabNumber, setTabNumber] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabNumber(newValue);
  }


  return (
    <Column
      horizontal='center'
      style={{width: '100%', maxWidth: '100%'}}
    >
      <Tabs
      value={tabNumber}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      centered
      >
        <Tab label={translate('dictionaryPage.alphabeticOrder')}/>
        <Tab label={translate('dictionaryPage.subject')}/>
      </Tabs>

      {words.length > 0 && 
      <>
        <Filter setFilter={setFilter} filter={filter} />
        <DualSwitch values={[switchValues[0], switchValues[1]]} changeSelectedValue={handleSubFunctionChange}/>
      </>
      }

      {tabNumber === 0 && dictionary && <OrderList dictionary={dictionary} sortDictionary={firstLetterSortedDictionary}  />}
      {tabNumber === 1 && dictionary && <OrderList dictionary={dictionary} sortDictionary={subjectSortedDictionary} />}
    </Column>
  )
}

export default DictionaryTabs;
