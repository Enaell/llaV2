import { useState, useEffect } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient'
import { UserType, WordListType, WordType } from '../../common/types';
import { WordList } from '../tabs/collapseList/WordList';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});
  const [words, setWords] = useState([] as WordType[])

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => {setWordLists(wl)});
    dictionaryApi.getAllWords(user.targetLanguage, user.token).then((w: WordType[]) => {setWords(w)});
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

  async function removeWordFromWordList(wordName: string, wordListName: string){
    if (!user.token)
    return {success: false, message: 'User not logged'};
    let wls = {...wordLists};
    delete wls[wordListName].words[wordName];
    setWordLists({...wls})
    const statusDeleteWFromWl = await dictionaryApi.removeWordFromWordList(wordName, wordLists[wordListName].id || wordListName, user.token);
    return statusDeleteWFromWl;
  }

  function addWordToWordList(word: WordType, wordListName: string) {
    const newWords = { ...wordLists[wordListName].words, [word.name]: word };
    const newWordList = { ...wordLists[wordListName], words: newWords };
    setWordLists({...wordLists, [wordListName]: newWordList});
  }

  function createWord(word: WordType){console.log(`add/create word ${word}`)};

  function saveWord(word: WordType){console.log(`save/mofify word ${word}`)};

  return { wordLists, words, createWordList, updateWordList, deleteWordList, removeWordFromWordList, addWordToWordList, createWord, saveWord }

}