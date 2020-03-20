import { connect } from 'react-redux';
import DictionaryTabs from './DictionaryTabs';

function mapStateToProps(state){
  return {
    words: state.dictionary.words,
    openWordPreview: state.dictionary.openWordPreview
  }
}

export default connect(mapStateToProps)(DictionaryTabs)