import React, { useState, useMemo } from 'react';
import { WordListType, WordType, LanguageType } from '../../../common/types';
import { WordCard, TranslationList } from '../../../common/CardsComponents'
import { Row, Column } from '../../../common/Flexbox';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';



const height= {
  minHeight: 'calc(100vh - 550px)',
  maxHeight: 'calc(100vh - 450px)',
  height: '100%',
  paddingLeft: '2px',
  paddingRight: '5px',
  overflowY: 'auto',
  overflowX: 'hidden'
}

function getPrimaryFontSize(charactersNumber: number, language: LanguageType)
{
  if (charactersNumber < 3 || (language !== 'Cn' && charactersNumber < 5))
    return "h1";
  if (charactersNumber < 5 || (language !== 'Cn' && charactersNumber < 9))
    return "h2";
  if ( charactersNumber < 6 || (language !== 'Cn' && charactersNumber < 11))
    return "h3";
  if (charactersNumber < 8 || (language !== 'Cn' && charactersNumber < 15))
    return "h4";
  return "h5";
}

export const WordForm = ({
  adminRole=false,
  create= false,
  canModify=false,
  wordList,
  word=undefined,
  language,
  targetLanguage,
  onSave
}: {
  adminRole?: boolean,
  create?: boolean,
  canModify?: boolean,
  wordList: WordListType,
  word?: WordType,
  language: LanguageType,
  targetLanguage: LanguageType
  onSave: (word: WordType) => void
}) => 
{
  const [newWord, setNewWord] = useState({...word} as WordType || {
    language,
    name:'',
    internationalName: '',
    level: 0,
    translations: [],
    subject: []
  } as WordType)
  
  const [onModify, setOnModify] = useState(create)
  
  useMemo(()=> {
    if (word != null) {
      setNewWord(word); 
      setOnModify(create)
    }
  }, [word, create]);

  return (
  <Row style={{width: '100%', margin: '20px'}}>
    <Column>
      <WordCard
        modify={onModify}
        style={{width:"300px"}}
        word={newWord}
        setWord={setNewWord}
        variant={(newWord.name && getPrimaryFontSize(newWord.name.length, targetLanguage)) || undefined}
        align={'center'}
        wordDetailAlign={'center'}
      /> 
    </Column>
    <TranslationList 
      setWordTranslations={(newTranslations) => setNewWord({...newWord, translations: [...newTranslations]})} 
      modify={onModify} 
      style={{width: '100%', marginLeft: '20px', ...height}}
      translations={newWord.translations}
      language={language}
    />
    {canModify && <>
      {!onModify ?
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            setOnModify(true);
          }}
        >
          <CreateOutlinedIcon />
        </IconButton>
        : <Column> 
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            setNewWord(word || {
              language,
              name:'',
              internationalName: '',
              level: 0,
              translations: [],
              subject: []
            });
            setOnModify(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();       
            onSave(newWord);
            setOnModify(false);
          }}
        >
          <SaveAltIcon />
        </IconButton>
      </Column>
      }
    </>}
  </Row>)
}
