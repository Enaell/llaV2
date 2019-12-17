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
      const getWordUrl = token ? 'http://localhost:3000/api/words?access_token=' + token : 'http://localhost:3000/api/words';
      fetch(getWordUrl,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
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