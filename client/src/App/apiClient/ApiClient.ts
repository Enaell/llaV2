import { WordListType, WordType } from "../components/common/types";

export const dictionaryApi = {
  getAllWords: async (language: string, token?: string) => {
    const getWordsUrl = language ? `http://localhost:5000/api/words?language=${language}` : `http://localhost:5000/api/words`
    const res = await fetch(getWordsUrl,
    {
      headers: token ? {
      'Authorization': `Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method:"GET"
    })
    const json = await res.json();
    return json.words as WordType[];
  },
  getAllWordLists: async (language: string, targetLanguage: string, token?: string) => {
    const getWordListsUrl = language && targetLanguage ? `http://localhost:5000/api/wordlists?language=${language}&targetlanguage=${targetLanguage}` : `http://localhost:5000/api/wordlists`;
    const res = await fetch(getWordListsUrl,
      {
        headers: token ? {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        } : {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"GET"
      });
    const json = await res.json();      
    return json.wordLists as {[key: string]: WordListType};
  }
}