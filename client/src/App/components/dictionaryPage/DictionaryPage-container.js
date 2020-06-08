import { connect } from 'react-redux';
import DictionaryPage from './DictionaryPage';

function mapStateToProps(state){
  return {
    user: state.user,
    openSidePanel: state.dictionary.openSidePanel,
    wordlists: state.dictionary.wordLists
  }
}

function mapDispatchToProps(dispatch){
  return {
    setNewWords: (newWords) => dispatch({type: 'SET_NEW_WORDS', payload: newWords}),
    setNewWordLists: (newWordLists) =>{ dispatch({type: 'SET_NEW_WORD_LISTS', payload: newWordLists})},
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DictionaryPage)