import React from 'react';
import { WordType } from '../../../common/types';
import { Column } from '../../../common/Flexbox';
import { Typography, Button } from '@material-ui/core';
import translate from 'counterpart';
import { SortableContainer } from 'react-sortable-hoc';
import { WordTile } from './WordTile';

const height= {
  minHeight: 'calc(100vh - 550px)',
  maxHeight: 'calc(100vh - 450px)',
  height: '100%',
  overflow: 'auto'
}

type WordsType = {
  userConnected?: boolean,
  words: {[key: string]: WordType};
  path: string;
  title?: string;
  labelBtnAdd?: string;
  disabledBtnAdd?: boolean;
  onAddWord: () => void;
  onDeleteWord: (wordlistId: string) => void;
  onSortEnd: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
}

export const Words = ({
  userConnected= false,
  words,
  path = '/dictionary/wordlists',
  title = translate('dictionaryPage.wordListPanel.words'),
  labelBtnAdd = translate('dictionaryPage.wordListPanel.add'),
  disabledBtnAdd = false,
  onAddWord,
  onDeleteWord,
  onSortEnd,
}: WordsType) => {
  return (
    <Column>
      <div style={{ marginBottom: '10px', marginRight: '5px', width: '305px' }}>
        {userConnected && 
        <>
          <Typography variant={'h5'}>{title}</Typography>
          <Button variant='outlined' onClick={onAddWord} disabled={disabledBtnAdd}>
            {labelBtnAdd}
          </Button>
        </>}
        <WordsContainer
          useDragHandle
          words={words}
          path={path}
          onDeleteWord={onDeleteWord}
          onSortEnd={onSortEnd}
        />
      </div>
    </Column>
  )
}

const WordsContainer = SortableContainer(({ words, path, onDeleteWord }: {words: {[key: string]: WordType}, path: string, onDeleteWord: (name: string) => void }) => (
  <div style={{ marginTop: '12px', ...height }}>
  {Object.keys(words).map((wordName: string, index: number) => (
    <WordTile
      key={wordName}
      index={index}
      word={words[wordName]}
      path={path}
      onDeleteWord={onDeleteWord}
    />
    ))}
  </div>
));