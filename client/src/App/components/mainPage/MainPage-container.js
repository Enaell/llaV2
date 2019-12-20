import { connect } from 'react-redux';
import MainPage from './MainPage'
import { withRouter } from "react-router-dom";


function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    onLoginClick:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 0})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
    onSigninClick:() => {
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 1})
      dispatch({type: 'TOGGLE_LOGIN_MODAL'})
    },
    connectAsVisitor: (language, learningLanguage) => {
      dispatch({type: 'LOGIN_AS_VISITOR', payload: {language: language, learningLanguage: learningLanguage}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainPage));