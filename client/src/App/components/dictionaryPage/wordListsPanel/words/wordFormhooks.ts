import { useState, useEffect, useMemo } from 'react';
import { WordType, TranslationType, VisibilityType } from '../../../common/types';

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

export function useWordForm(word: WordType, create: boolean) {

  const [newWord, setNewWord] = useState({...word});

  const [wordErrors, setWordError] = useState({name: false, internationalName: false, level: false, translations: false, subject: false, visibility: false})

  const [onModify, setOnModify] = useState(create)

  function updateWord(wordUpdated: WordType) {

    console.log(updateWord)
    setNewWord({...wordUpdated});
    setWordError({
      name: checkWordError('name' , wordUpdated.name),
      internationalName: checkWordError('internationalName', wordUpdated.internationalName),
      level: checkWordError('level', wordUpdated.level),
      translations: checkWordError('translations', wordUpdated.translations),
      subject: checkWordError('subject', wordUpdated.subject),
      visibility: checkWordError('visibility', wordUpdated.visibility)
    })
  }

  function cancelModification() {
    console.log('cancelModification')
    setNewWord({
      language: word.language,
      name:'',
      internationalName: '',
      level: 0,
      translations: [],
      subject: []
    });
    setWordError({name: false, internationalName: false, level: false, translations: false, subject: false, visibility: false})
    setOnModify(false);
  }

  useMemo(()=> {
    console.log('useMemo word and create')
    if (word != null) {
      setNewWord({...word});
      setWordError({name: false, internationalName: false, level: true, translations: false, subject: false, visibility: false});
      setOnModify(create)
    }
  }, [word, create]);


  return { newWord, wordErrors, onModify, updateWord, cancelModification, setOnModify }
} 