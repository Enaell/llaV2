import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { WordListType } from '../../common/types';
import translate from 'counterpart';
import { Typography, Button } from '@material-ui/core';
import { WordListsCard } from './WordListsCard';
import { Column } from '../../common/Flexbox';

type WordListsType = {
  wordLists: WordListType[];
  path?: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddCategory: () => void;
  onDeleteCategory: (wordlistId: number | undefined) => void;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const WordLists = ({
  wordLists,
  path = '/dictionary/wordlists',
  title = translate('dictionary.wordlist.title'),
  labelBtnAdd = translate('dictionary.wordlist.add'),
  disabledBtnAdd = false,
  onAddCategory,
  onDeleteCategory,
  onSortEnd,
}: WordListsType) => {
  return (
    <Column>
      <div style={{ marginBottom: '10px', minWidth: '290px' }}>
        <Typography variant={'h4'}>{title}</Typography>
        <Button variant='outlined' onClick={onAddCategory} disabled={disabledBtnAdd}>
          {labelBtnAdd}
        </Button>
        <WordListsContainer
          useDragHandle
          wordlists={wordLists}
          path={path}
          onDeleteCategory={onDeleteCategory}
          onSortEnd={onSortEnd}
        />
      </div>
    </Column>
  );
}


const WordListsContainer = SortableContainer(({ wordlists, path, onDeleteCategory }: any) => (
  <div style={{ marginTop: '12px' }}>
  {wordlists && wordlists.map((wordlist: WordListType, index: number) => (
    <WordListsCard
      key={wordlist.name}
      index={index}
      wordlist={wordlist}
      path={path}
      onDeleteCategory={onDeleteCategory}
    />
    ))}
  </div>

));
