import React from 'react';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { IconButton, Typography } from '@material-ui/core';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { WordListType } from '../../../common/types';


const DragHandle = SortableHandle(() => <span style={{position: "relative", top: '1px', display:'block', width: '18px', height:'11px', opacity:'0.25', marginRight: '9px', cursor: 'grab', background: 'linear-gradient(180deg, #000, #000 20%, #fff 0, #fff 40%, #000 0, #000 60%, #fff 0, #fff 80%, #000 0, #000)'}}/>)

type WordListTileType = {
  path: string;
  wordlist: WordListType;
  onDeleteWordList: (wordList: WordListType) => Promise<{success: boolean; message: any;}>
};

export const WordListTile = SortableElement(WordListTileComponent);

function WordListTileComponent({ path, wordlist, onDeleteWordList }: WordListTileType) {
  return (
    <NavLink
      key={wordlist.name}
      to={`${path}/${wordlist.name}`}
      replace
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #dadfea',
        borderRadius: '7px',
        textDecoration: 'none',
        color: 'black',
        backgroundColor: '#FFFFFF',
        marginBottom: '5px',
        marginRight: '10px',
        height: '42px',
        width: '280px',
        paddingLeft: '8px',
      }}
      activeStyle={{ color: 'blue', border: '1.5px solid #0058BB' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DragHandle />
        <Typography style={{ marginLeft: '15px', color: '#595959', fontWeight: 500, fontSize: '13px', lineHeight: '17px' }}>
          {wordlist.name}
        </Typography>
      </div>
      <IconButton
        onClick={e => {
          e.preventDefault();
          wordlist.id && onDeleteWordList(wordlist)
        }}
      >
        <DeleteIcon />
      </IconButton>
    </NavLink>
  );
}
