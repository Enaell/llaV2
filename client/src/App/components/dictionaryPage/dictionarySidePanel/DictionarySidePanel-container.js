import { connect } from 'react-redux';
import DictionarySidePanel from './DictionarySidePanel';


function mapStateToProps(state){
  return {
    word: state.dictionary.wordPreview,
    open: state.dictionary.openSidePanel,
    selectedWords: state.dictionary.selectedWords,
    openSelectedWords: state.dictionary.openSelectedWords,
    openWordPreview: state.dictionary.openWordPreview
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    toggleSidePanel: () => {
      dispatch({type: 'TOGGLE_SIDE_PANEL'});
    },
    setWordPreview: (word) => {
      dispatch({type: 'SET_WORD_PREVIEW', payload: word});
    },
    toggleWordPreview: () => {
      dispatch({type: 'TOGGLE_WORD_PREVIEW'});
    },
    toggleSelectedWords: () => {
      dispatch({type: 'TOGGLE_SELECTED_WORDS'});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionarySidePanel)