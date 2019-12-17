
import { connect } from 'react-redux';
import LoginModal from './LoginModal';


function mapStateToProps(state)
{
  return {
    open: state.loginModal.open,
    tabNumber: state.loginModal.tab,
  }
}

function mapDispatchToProps(dispatch){
  return {
    onLogin:(username, emailAddress, password) => {
      const loginBody = username !== '' ? {"username":username,"password":password} : {"email":emailAddress,"password":password};
      fetch("http://localhost:3000/api/customers/login",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loginBody)
        })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error){
            dispatch({type: 'TOGGLE_LOGIN_MODAL'});
            dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Login Error !"}});
            dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
          }
          else
          {
            dispatch({type: 'LOGIN', payload: json});
            dispatch({type: 'TOGGLE_LOGIN_MODAL'});
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch({type: 'TOGGLE_LOGIN_MODAL'});
          dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Login Error !"}});
          dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
        });
    },
    onSignin:(username, emailAddress, password) => {
      const signinBody =  {"name": username, "email": emailAddress, "username": username,"password": password};
      fetch("http://localhost:3000/api/customers",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(signinBody)
        })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error){
            dispatch({type: 'TOGGLE_LOGIN_MODAL'});
            dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Signin Error !"}});
            dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
          }
          else
          {
            dispatch({type: 'LOGIN', payload: json});
            dispatch({type: 'TOGGLE_LOGIN_MODAL'});
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch({type: 'TOGGLE_LOGIN_MODAL'});
          dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Signin Error !"}});
          dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
        });
    },
    changeTabNumber:(tabNumber) =>{
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: tabNumber});
    },
    closeModal:() => {
      dispatch({type: 'TOGGLE_LOGIN_MODAL'});
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
