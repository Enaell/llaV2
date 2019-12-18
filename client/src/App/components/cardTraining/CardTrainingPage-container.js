import {connect} from 'react-redux';
import CardTrainingPage from './CardTrainingPage'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

function mapStateToProps(state){
  return {
    turnData: state.turnData,
    highlight: state.highlight,
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    onAnswerSelected: (payload) => { 
      dispatch({type: 'ANSWER_SELECTED', payload});
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE'});
    },
    getCards: (token) => {
      const headers = token ? {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } : {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      };

      fetch('http://localhost:5000/api/words',
      { 
        headers:  headers,
        method:"GET"
      })
      .then((res) => {
        return res.json();
      })
      .then((json) => dispatch({type: 'GET_CARDS', payload: json}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(CardTrainingPage));
