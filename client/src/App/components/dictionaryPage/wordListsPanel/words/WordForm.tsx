import React, { useState, useMemo } from 'react';
import { WordListType, WordType, LanguageType, VisibilityType, TranslationType } from '../../../common/types';
import { WordCard, TranslationList } from '../../../common/CardsComponents'
import { Row, Column } from '../../../common/Flexbox';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { forEach } from 'underscore';

const height= {
  maxHeight: 'calc(100vh - 450px)',
  paddingLeft: '2px',
  paddingRight: '5px',
  overflowY: 'auto',
  overflowX: 'hidden'
}

type WordErrorsType = {
    name: boolean;
    internationalName: boolean;
    level: boolean;
    translations: boolean;
    subject: boolean;
    visibility: boolean;
}

function getPrimaryFontSize(charactersNumber: number, language: LanguageType){
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

function checkWordError(
  key: 'name' | 'internationalName' | 'level' | 'translations' | 'subject' | 'visibility',
  value: string | string[] | [] | TranslationType[] |  number | boolean | VisibilityType | undefined
  ) {
  switch (key) {
    case 'subject':
      return !(value != '');
    case 'level': 
      return !(value || value === 0);
    case 'translations':
      let translationsError = true;
      const translations  = value as TranslationType[];
      translations.forEach(translation => {
        if (translation.name) translationsError = false;
      });
      return translationsError;
    default: 
      return !value
  }
}

function canSave(wordErrors: WordErrorsType){
  return !Object.values(wordErrors).some(wordError=> wordError === true)
}

export const WordForm = ({
  isAdmin=false,
  isOwner=false,
  create= false,
  word=undefined,
  language,
  targetLanguage,
  onSave
}: {
  isAdmin?: boolean,
  isOwner?: boolean,
  create?: boolean,
  word?: WordType,
  language: LanguageType,
  targetLanguage: LanguageType
  onSave: (word: WordType) => void
}) => 
{
  const [newWord, setNewWord] = useState({...word} as WordType || {
    language: targetLanguage,
    name:'',
    internationalName: '',
    level: 0,
    translations: [],
    subject: [],
    visibility: 'owner'
  } as WordType);

  const [wordErrors, setWordError] = useState({name: false, internationalName: false, level: false, translations: false, subject: false, visibility: false})
  
  const [onModify, setOnModify] = useState(create)
  
  useMemo(() => {
    setWordError({
      name: checkWordError('name' , newWord.name),
      internationalName: checkWordError('internationalName', newWord.internationalName),
      level: checkWordError('level', newWord.level),
      translations: checkWordError('translations', newWord.translations),
      subject: checkWordError('subject', newWord.subject),
      visibility: checkWordError('visibility', newWord.visibility)
    })
  }, [newWord])

  useMemo(()=> {
    if (word != null) {
      setNewWord(word);
      setWordError({name: false, internationalName: false, level: true, translations: false, subject: false, visibility: false});
      setOnModify(create)
    }
  }, [word, create]);

  return (
  <Row style={{width: '100%', margin: '20px'}}>
    <Column>
      <WordCard
        isAdmin={isAdmin}
        modify={onModify}
        style={{width:"300px", ...height}}
        word={newWord}
        wordErrors={wordErrors}
        setWord={setNewWord}
        variant={(newWord.name && getPrimaryFontSize(newWord.name.length, targetLanguage)) || undefined}
        align={'center'}
        wordDetailAlign={'center'}
        targetLanguage={targetLanguage}
      /> 
    </Column>
    <TranslationList 
      setWordTranslations={(newTranslations) => setNewWord({...newWord, translations: [...newTranslations]})} 
      modify={onModify} 
      style={{width: '100%', marginLeft: '20px', ...height}}
      translations={newWord.translations}
      language={language}
      error={wordErrors.translations}
    />
    {(isAdmin || isOwner) && <>
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
            setWordError({name: false, internationalName: false, level: true, translations: false, subject: false, visibility: false})
            setOnModify(false);
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            if (canSave(wordErrors)) {
              onSave(newWord);
              setOnModify(false);
            }
          }}
        >
          <SaveAltIcon />
        </IconButton>
      </Column>
      }
    </>}
  </Row>)
}
