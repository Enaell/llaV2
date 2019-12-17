import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Turn from './turn/Turn';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-12">
        <h1>Character Quizz</h1>
        <p>Select the correct traduction of the character</p>
      </div>
    </div>
  );
}

function Continue({show, onContinue}) {
  return (
    <div className="row">
    {
       show ?
        <div className="col-11"><button className="btn btn-primary btn-lg float-right" onClick={onContinue}> Continue </button></div>
      : null
    }
    </div>
  )
}

const CardTrainingPage = ({turnData, highlight, user, onAnswerSelected, onContinue, getCards, classes }) => 
  {
    useEffect(()=>{
      const token = user.id ? user.id : null;
      getCards(token);
      },[]);

    return (
      <React.Fragment>
        {turnData &&
        <div>
        <div className="row">
          <div className="col-8 offset-2 characterQuizz">
            <Hero />
            <Paper className={classes.root} elevation={3}>
              <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
            </Paper>
            <Continue show={highlight === 'correct'} onContinue={onContinue}/>
          </div>
        </div>
        <div className="row">
          <Link to="/addCard"> Add a new Card</Link>
        </div>
        </div>}
      </React.Fragment>
    );
  }

  export default CardTrainingPage;
