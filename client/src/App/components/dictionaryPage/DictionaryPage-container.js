import { connect } from 'react-redux';
import DictionaryPage from './DictionaryPage';


function getHeaders(token) {
  return token ? {
    'Authorization': `Token ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } : {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
}

function mapStateToProps(state){
  return {
    user: state.user,
    openSidePanel: state.dictionary.openSidePanel,
    wordlists: state.dictionary.wordLists
  }
}

function mapDispatchToProps(dispatch){
  return{
    getAllWords: (language, token) => {
      const headers = getHeaders(token)

      const getWordsUrl = language ? `http://localhost:5000/api/words?language=${language}` : `http://localhost:5000/api/words`

      fetch(getWordsUrl,
      {
        headers: headers,
        method:"GET"
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => dispatch({type: 'GET_WORDS', payload: json.words}))
    },
    getAllWordLists: async (language, targetLanguage, token) => {
      const headers = getHeaders(token);
      const getWordListsUrl = language ? `http://localhost:5000/api/wordlists?language=${language}&targetlanguage=${targetLanguage}` : `http://localhost:5000/api/wordlists`;
      const res = await fetch(getWordListsUrl,
        {
          headers: headers,
          method:"GET"
        });
      const json = await res.json();
      console.log(json);
        
      dispatch({type: 'GET_WORD_LISTS', payload: json.wordLists});
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DictionaryPage)