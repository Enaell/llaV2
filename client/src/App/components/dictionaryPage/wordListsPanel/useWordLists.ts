import { useState, useEffect } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient'
import { UserType, WordListType, WordType } from '../../common/types';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => {setWordLists(wl)});
  }, [user.token]);

  async function createWordList( wordList: WordListType){
    if (!user.token)
      return {success: false, message: 'User not logged'}
    setWordLists({...wordLists, [wordList.name]: wordList});
    return await dictionaryApi.createWordLists([wordList], user.token);
  };
  
  async function updateWordList(wordList: WordListType, wordListOldName?: string){
    let wls = {...wordLists}
    if (!user.token)
      return {success: false, message: 'User not logged'};
    if (wordListOldName)
      delete wls[wordListOldName];
    setWordLists({...wls, [wordList.name]: wordList});
    return await dictionaryApi.updateWordList(wordList, user.token);
  };

  async function deleteWordList(wordList: WordListType){
    let wls = {...wordLists}
    if (!user.token)
      return {success: false, message: 'User not logged'};
    if (!wordList.id)
      return {success: false, message: 'No wordList Id'};
    const statusDeleteWl = await dictionaryApi.deleteWordList(wordList.id, user.token);
    if (statusDeleteWl.success) {
      delete wls[wordList.name];
      setWordLists({...wls});
    }
    return statusDeleteWl;
  }

  function createWord(word: WordType){console.log(`add/create word ${word}`)};

  function saveWord(word: WordType){console.log(`save/mofify word ${word}`)};

  return { wordLists, createWordList, updateWordList, deleteWordList, createWord, saveWord }

}