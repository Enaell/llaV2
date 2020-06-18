import { connect } from 'react-redux';
import { UserPage } from './UserPage'
import { withRouter } from "react-router-dom";

function mapStateToProps(state){
  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){
  return{
    setLanguage: (language, token) => {
      dispatch({type: 'SET_LANGUAGE', payload: language});
      fetch("http://localhost:5000/api/users/",
      {
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PATCH",
          body: JSON.stringify({language: language})
      })
    },
    setTargetLanguage: (targetLanguage, token) => {
      dispatch({type: 'SET_TARGET_LANGUAGE', payload: targetLanguage});
      fetch("http://localhost:5000/api/users/",
      {
          headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PATCH",
          body: JSON.stringify({targetLanguage: targetLanguage})
      })
    },
    updateUserBoard: async (userBoard, token) => {
      if (token)
        fetch("http://localhost:5000/api/usergridBlocks",
        {
            headers: {
              'Authorization': `Token ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
                },
            method: "PATCH",
            body: JSON.stringify(userBoard)
        })
      dispatch({type: 'UPDATE_USERBOARD', payload: userBoard})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage));