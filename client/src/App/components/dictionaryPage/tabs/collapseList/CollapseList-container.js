import { connect } from 'react-redux';
import CollapseList from './CollapseList';

function mapStateToProps(state){
  return {
    selectedWords: state.dictionary.selectedWords
  }
}

function mapDispatchToProps(dispatch){
  return{
    updateSelectedWords: word => {
      dispatch({type: 'UPDATE_SELECTED_WORDS', payload: word})
    },
    setWordPreview: word => {
      dispatch({type: 'SET_WORD_PREVIEW', payload: word});
      dispatch({type: 'OPEN_SIDE_PANEL' });
      dispatch({type: 'OPEN_WORD_PREVIEW' });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapseList)