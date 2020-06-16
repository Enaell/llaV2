import { useState, useEffect, useMemo } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient'
import { UserType, WordListType, WordType } from '../../common/types';
import { renameObjectKey } from '../../common/utils'
import { WordList } from '../tabs/collapseList/WordList';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});
  const [words, setWords] = useState([] as WordType[])

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => {setWordLists(wl)});
    dictionaryApi.getAllWords(user.targetLanguage, user.token).then((w: WordType[]) => {setWords(w)});
  }, [user.token]);

  useMemo(() => {
    words.sort((a, b) => a.internationalName > b.internationalName ? 1 : -1)
  }, [words])

  async function createWordList( wordList: WordListType){
    if (!user.token)
      return {success: false, message: 'User not logged'}
    setWordLists({...wordLists, [wordList.name]: wordList});
    return await dictionaryApi.createWordLists([wordList], user.token);
  };
  
  async function updateWordList(wordList: WordListType, wordListOldName?: string){
    if (!user.token)
      return {success: false, message: 'User not logged'};

      setWordLists(wordListOldName && wordListOldName !== wordList.name
      ? {...renameObjectKey({[wordListOldName]: wordList.name}, wordLists), [wordList.name]: wordList}
      : {...wordLists, [wordList.name]: wordList});
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
    return await dictionaryApi.removeWordFromWordList(wordName, wordLists[wordListName].id || wordListName, user.token);
  }

  function addWordToWordList(word: WordType, wordListName: string) {
    setWordLists({
      ...wordLists,
      [wordListName]: { 
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [word.name]: word }
      }
    });
  }

  async function createWordInWordList(word: WordType, wordListName: string){
    const wlId = wordLists[wordListName].id;
    
    if (!wlId || !user.token) 
    return {success: false, message: 'User not logged'};
  
    const status = await dictionaryApi.createWordsInWordList(wlId, [word], user.token)

    setWordLists({
      ...wordLists,
      [wordListName]: { 
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [word.name]: status.success ? {...word, id: status.message.words[0]._id}: {...word, id: word.name} }
      }
    });

    return status
  };


  // Finish this function by add save or creation of word (taking account name change => need IDs to recognize the words and prevent unlink on other pages) 
  async function saveWord(newWord: WordType, wordListName: string, originalWordName?: string){
    if (!user.token)
      return {success: false, message: 'User not logged'};

    setWords(words.map(word => ( word.id === newWord.id ? newWord : word)));

    // if (originalWordName)
    //   delete wordLists[wordListName].words[originalWordName]
    setWordLists( originalWordName && originalWordName !== newWord.name 
      ? {
        ...wordLists,
        [wordListName]: { 
          ...wordLists[wordListName], 
          words: { ...renameObjectKey({[originalWordName]: newWord.name}, wordLists[wordListName].words), [newWord.name]: newWord }
        }
      }
      : {
      ...wordLists,
      [wordListName]: { 
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [newWord.name]: newWord }
      }
    });

    return await dictionaryApi.updateWord(newWord, user.token);
  };

  return { wordLists, words, createWordList, updateWordList, deleteWordList, removeWordFromWordList, addWordToWordList, createWordInWordList, saveWord }
}