import { connect } from 'react-redux';
import DictionaryPage from './DictionaryPage';


function mapStateToProps(state){
  return {
    user: state.user,
    openSidePanel: state.dictionary.openSidePanel
  }
}

function mapDispatchToProps(dispatch){
  return{
    getAllWords: (language, token) => {
      const headers = token ? {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } : {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const getWordsUrl = language ? `http://localhost:5000/api/words?language=${language}` : `http://localhost:5000/api/words`

      fetch(getWordsUrl,
      {
        headers: headers,
        method:"GET"
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => dispatch({type: 'GET_WORDS', payload: json}))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DictionaryPage)