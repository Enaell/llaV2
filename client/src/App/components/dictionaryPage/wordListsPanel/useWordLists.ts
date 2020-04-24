import { useState, useEffect, useMemo } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient'
import { UserType, WordListType } from '../../common/types';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => setWordLists(wl));
  }, [user.token]);

  function createWordList(){console.log('add/create wordlist')}
  function createWord(){console.log('add/create word')}
  function saveWordList(){console.log('save/modify wordlist')}
  function saveWord(){console.log('save/mofify word')}

  return { wordLists, createWordList, createWord, saveWordList, saveWord }

}