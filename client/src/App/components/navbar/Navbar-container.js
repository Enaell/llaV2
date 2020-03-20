import { connect } from 'react-redux';
import Navbar from './Navbar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";


const styles = theme => ({
  root: {
    zIndex: 9999,
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  homeButton:{
    textTransform: 'none',
  }
});

function mapStateToProps(state)
{
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch)
{
  return {
    openLoginModal:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 0})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
    openSigninModal:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 1})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter( Navbar )));