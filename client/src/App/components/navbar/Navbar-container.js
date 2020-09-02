import { connect } from 'react-redux';
import {Navbar} from './Navbar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";


const styles = theme => ({
  root: {
    zIndex: 9999,
    width: '100%',
  },
  grow: {
flex: 1  },
  grow3: {
flex:3  }
  ,
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  homeButton:{
    textTransform: 'none',
  }
});

function mapDispatchToProps(dispatch)
{
  return {
    openLoginModal:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 2})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
    openSigninModal:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 1})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(withRouter( Navbar )));