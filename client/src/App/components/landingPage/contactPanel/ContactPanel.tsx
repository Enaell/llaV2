import React, { useState } from 'react'
import { Column, Row } from '../../common/Flexbox'
import { TextField } from '@material-ui/core';
import translate from 'counterpart';
import { WhiteButton } from '../../common/GenericComponents';
import { mailerApi } from '../../../apiClient/ApiClient';

type ErrorType = {
  name: boolean;
  email: boolean;
  subject: boolean;
  comments: boolean;
}

type FieldsType = {
  name: string;
  email: string;
  subject: string;
  comments: string;
}

function getError(error: ErrorType) {
  return !error.name && !error.email && !error.subject && !error.comments;
}

export const ContactPanel = () => {

  const [fields, setFields] = useState({
    name: '',
    email: '',
    subject: '',
    comments: ''
  })

  const [error, setError] = useState({
    name: true,
    email: true,
    subject: true,
    comments: true
  });

  const [displayError, setDisplayError] = useState(false);

  function updateFields(fieldName: string, fieldValue: string) {
    console.log(fieldValue);
    console.log(!fieldValue);
    setFields({...fields, [fieldName]: fieldValue});
    setError({...error, [fieldName]: !fieldValue});
  }


  console.log(fields);
  console.log(error)

  return (
    <Column vertical={'space-between'} horizontal={'center'} style={{width: '100%', maxWidth: '800px', padding: '40px', backgroundColor: 'white', borderRadius: '30px', marginTop: '40px'}}>
      <Row width='100%' horizontal='space-between'>
        <TextField
          required
          error= { displayError && error.name}
          margin="dense"
          id="name"
          label={translate('connection.username')}
          type="text"
          onChange={(event)=>{updateFields('name', event.target.value)}}
          style={{width: '40%'}}
        />
        <TextField
          required
          error= { displayError && error.email}
          margin="dense"
          id="email"
          label={translate('connection.email')}
          type="email"
          onChange={(event)=>{updateFields('email', event.target.value)}}
          style={{width: '40%'}}
        />
      </Row>
      <TextField
        required
        error= { displayError && error.subject}
        margin="dense"
        id="subject"
        label={translate('connection.subject')}
        type="text"
        onChange={(event)=>{updateFields('subject', event.target.value)}}
        fullWidth
      />
      <TextField
        required
        error= { displayError && error.comments}
        margin="dense"
        id="comments"
        label={'Comments'}
        type="text"
        onChange={(event)=>{updateFields('comments', event.target.value)}}
        multiline
        rows={6}
        rowsMax={10}  
        fullWidth
      />
      <WhiteButton 
        variant='outlined'
        type='submit'
        onClick={(e)=> {
          e.preventDefault();
          setDisplayError(true)
          if (getError(error))
            mailerApi.sendContactEmail(fields.name, fields.email, fields.subject, fields.comments);
        }} 
        style={{marginTop: '30px'}}>
          {translate('connection.send')}
        </WhiteButton>
    </Column>
  );
}