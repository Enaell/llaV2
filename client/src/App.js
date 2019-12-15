import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  
  useEffect(() => {
    fetch('http://localhost:5000/api/words', {method: "GET", headers: {
                "Content-Type": "application/json"
              }})
//     fetch("http://localhost:5000/api/users", {
//       method: "POST",
//       headers: {
// //        'Authorization': 'Token ' + UserTokenFromLogin
//         "Content-Type": "application/json"
//       },          
//       body: JSON.stringify({
//         "user": {
//           "email": "enael@enael.com",
//           "password": "enael"
//         }
//       })
//     })
//     .then(res => res.json())
//     .then(json => {
//       console.log('=================== create user =======================');
//       console.log(json);
//       fetch('http://localhost:5000/api/words', {method: "GET", headers: {
//                 'Authorization': 'Token ' + json.user.token,
//                 "Content-Type": "application/json"
//               }})
//     }).catch(e => console.log(e));  
     },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
