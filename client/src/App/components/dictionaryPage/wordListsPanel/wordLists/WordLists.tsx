import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { WordListType } from '../../../common/types';
import translate from 'counterpart';
import { Typography, Button } from '@material-ui/core';
import { WordListTile } from './WordListTile';
import { Column } from '../../../common/Flexbox';

type WordListsType = {
  wordLists: {[key: string]: WordListType};
  path?: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddWordList: () => void;
  onDeleteWordList: (wordlistId: string | undefined) => void;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const WordLists = ({
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
    <Column>
      <div style={{ marginBottom: '10px', minWidth: '290px' }}>
        <Typography variant={'h5'}>{title}</Typography>
        <Button variant='outlined' onClick={onAddWordList} disabled={disabledBtnAdd}>
          {labelBtnAdd}
        </Button>
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


const WordListsContainer = SortableContainer(({ wordlists, path, onDeleteWordList }: {wordlists: {[key: string]: WordListType}, path: string, onDeleteWordList: (name: string | undefined) => void }) => (
  <div style={{ marginTop: '12px' }}>
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
