import React, { useState, useEffect } from 'react';
import CollapseList from './collapseList';
import { Row } from '../../common/Flexbox'
import { WordType } from '../../common/types';

const OrderList = ({ dictionary, sortDictionary }
  : { 
      dictionary: WordType[], 
      sortDictionary: (dictionary: WordType[]) => {
        [key: string]: WordType[];
      } 
  }) => {
    
  const [listOfWords, setlistOfWords] = useState(sortDictionary ? sortDictionary(dictionary): {});

  useEffect(() => setlistOfWords(sortDictionary ? sortDictionary(dictionary): {}), [dictionary, sortDictionary])

  return (
    <Row wrap horizontal='center' style={{maxWidth: '1150px'}}>
      {listOfWords && Object.keys(listOfWords).length > 0 && Object.keys(listOfWords).map((key) =>(
        <CollapseList horizontal='center' style={{ margin: '15px'}} key={key} listTitle={key} wordList={listOfWords[key]} />
      ))}
    </Row>
  )
}

export default OrderList;