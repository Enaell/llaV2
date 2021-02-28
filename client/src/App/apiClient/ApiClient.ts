import { UserType, WordListType, WordType } from "../components/common/types";

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
    const words =  json.words.map((word: any) => {
      const w = {...word, id: word._id};
      delete w._id;
      return w;
    }) as WordType[];
    
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

export const userApi = {

  signin: async (user: UserType) => {
    console.log(`===================================`);
    console.log(`TEST SIGNIN`);
    try {
      const res = await fetch(`http://localhost:3020/api/users/`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "email": user.email,
          "username": user.username,
          "password": user.password,
          "language": user.language,
          "targetLanguage": user.targetLanguage,
        })
      });
      const json = await res.json();
      console.log('===================================');
      console.log(json);
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  auth: async (email: string, password: string) => {
    console.log(`===================================`);
    console.log(`TEST LOGIN`);
    try {
      const res = await fetch(`http://localhost:3020/api/auth/login`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "username": email,
          "password": password
        })
      });
      const json = await res.json();
      console.log('===================================');
      console.log(json);
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  },
  update: async (user: UserType) => {
    console.log('------------------------------------------');
    console.log('Update User');
    const {userboard, token, name, email, username, language, targetLanguage, levels} = user;
    const userUpdates = {
      username, language, targetLanguage, email, userboard, name, levels
    }
    console.log(userUpdates);

    try {
      const res = await fetch(`http://localhoset:3020/api/users/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify(userUpdates),
      });
      const json = await res.json();
      console.log('------------------------------------------');
      console.log(json);
      return {success: true, message: json};
    } catch (error) {
        console.log(error);
        return {success: false, message: error.message}
    }
  },
  greet: async () => {
    console.log(`===================================`);
    console.log(`TEST GREET`);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMTVkMDI3YmEwYjc1MDAxZTkyZWFkMCIsInVzZXJuYW1lIjoiVVNFUjEiLCJwYXNzd29yZCI6IiQyYiQxMCRScWxhTE9wWHl6RUFsaWNsVUhpeHpPZjRQdWlYNzdSSDA3SkNZS2lCdG1ub0lNQWdBWFY5YSIsIm5hbWUiOiJ1c2VyMSIsImVtYWlsIjoiYUBhLmZyIiwiY3JlYXRlQXQiOiIyMDIxLTAxLTMwVDIxOjMxOjE5Ljk1NVoiLCJfX3YiOjB9LCJpYXQiOjE2MTMyNDc3NzgsImV4cCI6MTYxMzI1NDk3OH0.e1CZLhH4h4WnlpAKkvI7YaRyekHPMOUou92FMf0w7q4";
    try {
      const res = await fetch(`http://localhost:3020/api/auth/greet`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
      });
      const json = await res.json();
      return {success: true, message: json};
    }
    catch (error) {
      console.log(error);
      return {success: false, message: error.message}
    }
  }
}

export const mailerApi = {
  sendContactEmail: async (name: string, email: string, subject: string, comments: string) => {
    console.log('MAIL API !')
    const res = await fetch('http://localhost:5050/email/contact',
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      body: JSON.stringify({ name, email, subject, comments })
    });
    
    return res.status;
  }
}