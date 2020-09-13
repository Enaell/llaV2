import { useState, useEffect, useMemo } from 'react';
import { dictionaryApi } from '../../../apiClient/ApiClient';
import { UserType, WordListType, WordType } from '../../common/types';
import { renameObjectKey, cleanTranslations } from '../../common/utils';

export function useWordLists(user: UserType) {

  const [wordLists, setWordLists] = useState({} as {[key: string]: WordListType});
  const [words, setWords] = useState([] as WordType[])

  useEffect(() => {
    dictionaryApi.getAllWordLists(user.language, user.targetLanguage, user.token).then(wl => {setWordLists(wl)});
    dictionaryApi.getAllWords(user.targetLanguage, user.token).then((w: WordType[]) => {setWords(w)});
  }, [user.token, user.language, user.targetLanguage]);

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
    return await dictionaryApi.updateWordList(wordLists[wordListName], user.token);
  }

  async function addWordToWordList(word: WordType, wordListName: string) {
    if ( !user.token)
      return {success: false, message: 'User not logged'};

      const wordListUpdated = {
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [word.name]: word }
      };

    setWordLists({
      ...wordLists,
      [wordListName]: wordListUpdated
    });

    return await dictionaryApi.updateWordList(wordListUpdated, user.token)
  }

  async function createWordInWordList(word: WordType, wordListName: string){
    const wlId = wordLists[wordListName].id;
    
    const cleanWord = cleanTranslations(word);

    if (!wlId)
      return {success: false, message: 'Wordlist has no Id'};

    if (!user.token) 
    return {success: false, message: 'User not logged'};
  
    const status = await dictionaryApi.createWordsInWordList(wlId, [cleanWord], user.token)

    setWordLists({
      ...wordLists,
      [wordListName]: { 
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [cleanWord.name]: status.success ? {...cleanWord, id: status.message.words[0]._id}: {...cleanWord, id: cleanWord.name} }
      }
    });

    return status
  };


  async function updateWord(newWord: WordType, wordListName: string, originalWordName?: string){
    if (!user.token)
      return {success: false, message: 'User not logged'};

    const cleanWord = cleanTranslations(newWord);

    setWords(words.map(word => ( word.id === cleanWord.id ? cleanWord : word)));

    setWordLists( originalWordName && originalWordName !== cleanWord.name 
      ? {
        ...wordLists,
        [wordListName]: { 
          ...wordLists[wordListName], 
          words: { ...renameObjectKey({[originalWordName]: cleanWord.name}, wordLists[wordListName].words), [cleanWord.name]: cleanTranslations(cleanWord) }
        }
      }
      : {
      ...wordLists,
      [wordListName]: { 
        ...wordLists[wordListName], 
        words: { ...wordLists[wordListName].words, [cleanWord.name]: cleanWord }
      }
    });

    return await dictionaryApi.updateWord(cleanWord, user.token);
  };

  return { wordLists, words, createWordList, updateWordList, deleteWordList, removeWordFromWordList, addWordToWordList, createWordInWordList, updateWord }
}