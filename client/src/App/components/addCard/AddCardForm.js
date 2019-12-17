import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CardForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      character: '',
      pinying: '',
      translations: [],
      comments:'',
      translationTemp: ''
    }
    
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddTranslation = this.handleAddTranslation.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onAddCard(this.state);
  }

  handleAddTranslation(event){
    this.setState({
      translations: this.state.translations.concat([this.state.translationTemp]),
      translationTemp: ''
    });

  }
  onFieldChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>

        <TextField
          id="outlined-character-input"
          label="Character"
          margin="normal"
          variant="outlined"
          value={this.state.character}
          onChange={this.onFieldChange}
          name="character"
          required
        />

        <TextField
          id="outlined-pinying-input"
          label="Pinying"
          margin="normal"
          variant="outlined"
          value={this.state.pinying}
          onChange={this.onFieldChange}
          name="pinying"
          required
        />

        <TextField
          id="outlined-comments-input"
          label="Comments"
          margin="normal"
          variant="outlined"
          value={this.state.comments}
          onChange={this.onFieldChange}
          name="comments"
        />

        <TextField
          id="outlined-translationTemp-input"
          label="Translation"
          margin="normal"
          variant="outlined"
          value={this.state.translationTemp}
          onChange={this.onFieldChange}
          name="translationTemp"

        />
        <Button variant="contained" onClick={this.handleAddTranslation}>
          Add
        </Button>

        <Button type="submit" variant="contained">
          Add
        </Button>      </form>
    )}
}

function AddCardForm({match, onAddCard}){
  return(
    <div>
      <h1>Add Card</h1>
      <CardForm onAddCard={onAddCard}/>
    </div>
  );
}

function mapDispatchToProps(dispatch, props){
  return{
    onAddCard:(card) => {
      dispatch({type:'ADD_CARD', card});
      props.history.push('/');
    }
  }
}

function mapStateToProps()
{
  return({})
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps)(AddCardForm));