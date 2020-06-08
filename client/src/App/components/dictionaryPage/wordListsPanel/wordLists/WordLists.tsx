import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { WordListType } from '../../../common/types';
import translate from 'counterpart';
import { Typography, Button } from '@material-ui/core';
import { WordListTile } from './WordListTile';
import { Column } from '../../../common/Flexbox';

const height= {
  minHeight: 'calc(100vh - 550px)',
  maxHeight: 'calc(100vh - 450px)',
  height: '100%'
}

type WordListsType = {
  style?: any,
  userConnected?: boolean,
  wordLists: {[key: string]: WordListType};
  path?: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddWordList: () => void;
  onDeleteWordList: (wordList: WordListType) => Promise<{success: boolean; message: any;}>
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const WordLists = ({
  style={},
  userConnected= false,
  wordLists,
  path = '/dictionary/wordlists',
  title = translate('dictionaryPage.wordListPanel.wordLists'),
  labelBtnAdd = translate('dictionaryPage.wordListPanel.add'),
  disabledBtnAdd = false,
  onAddWordList,
  onDeleteWordList,
  onSortEnd,
}: WordListsType) => {
  return (
    <Column style={{...style}}>
      <div style={{ marginBottom: '10px', marginRight: '10px', width: '310px' }}>
        <Typography variant={'h5'}>{title}</Typography>
        {userConnected && 
        <Button variant='outlined' onClick={onAddWordList} disabled={disabledBtnAdd}>
          {labelBtnAdd}
        </Button>}
        <WordListsContainer
          useDragHandle
          wordlists={wordLists}
          path={path}
          onDeleteWordList={onDeleteWordList}
          onSortEnd={onSortEnd}
        />
      </div>
    </Column>
  );
}


const WordListsContainer = SortableContainer(({ wordlists, path, onDeleteWordList }: {
  wordlists: {[key: string]: WordListType},
  path: string,
  onDeleteWordList: (wordList: WordListType) => Promise<{success: boolean; message: any;}>
}) => (
  <div style={{ marginTop: '12px', overflowY: 'auto', ...height }}>
  {wordlists && Object.keys(wordlists).map((wordlistname: string, index: number) => {
    return (
      <WordListTile
        key={wordlistname}
        index={index}
        wordlist={wordlists[wordlistname]}
        path={path}
        onDeleteWordList={onDeleteWordList}
      />
      )
    })}
  </div>
));
