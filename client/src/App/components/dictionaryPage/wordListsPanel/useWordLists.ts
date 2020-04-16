import { useState, useEffect, useMemo } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient'
import { UserType, WordListType } from '../../common/types';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => setWordLists(wl));
  }, [user.token]);

  return { wordLists }

}