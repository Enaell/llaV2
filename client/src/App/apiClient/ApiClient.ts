import { WordListType, WordType } from "../components/common/types";

export const dictionaryApi = {
  getAllWords: async (targetLanguage: string, token?: string) => {
    const getWordsUrl = targetLanguage ? `http://localhost:5000/api/words?language=${targetLanguage}` : `http://localhost:5000/api/words`
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
    const words =  json.words as WordType[];
    return [...words].sort((a, b) => a.internationalName > b.internationalName ? 1 : -1)
  },
  updateWord: async (word: WordType, token: string) => {
    console.log('api client dictionary update word');
    console.log(word);
    try {
      const res = await fetch('http://localhost:5000/api/words',{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"PATCH",
        body: JSON.stringify({
          word
        })
      });
      const json = await res.json();
      console.log('===================================');
      console.log(json);
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  getAllWordLists: async (language: string, targetLanguage: string, token?: string) => {
    try {
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
    } catch (error) {
      console.log(error);
      return {}
    }
  },
  createWordLists: async (wordLists: WordListType[], token: string) => {
    console.log('api client dictionary create wordlists');
    console.log(wordLists);
    try {
      const res = await fetch('http://localhost:5000/api/wordlists',{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({
          wordLists
        })
      });
      const json = await res.json();      
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  createWordsInWordList: async (wordListId: string, words: WordType[], token: string) => {
    console.log(`api client dictionary create word id wordlist ${wordListId}`);
    console.log(words);
    try {
      const res = await fetch(`http://localhost:5000/api/wordlists/${wordListId}/words`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          words
        })
      });
      const json = await res.json();
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  updateWordList: async (wordList: WordListType, token: string) => {
    console.log('api client dictionary update wordlist');
    console.log(wordList);
    try {
      const res = await fetch('http://localhost:5000/api/wordlists',{
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"PATCH",
        body: JSON.stringify({
          wordList
        })
      });
      const json = await res.json();      
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  deleteWordList: async (wordListId: string, token: string) => {
    console.log('api client dictionary delete wordlist');
    console.log(wordListId);
    try {
      const res = await fetch(`http://localhost:5000/api/wordlists/${wordListId}`, {
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"DELETE"
      });
      const json = await res.json();
      return {success: true, message: json};
    } catch (error) {
      console.log(error);
      return {success: false, message: error.message};
    }
  },
  removeWordFromWordList: async (wordName: string, wordlistId: string, token: string) => {
    console.log('api client dictionary remove word from wordlist')
  }
}