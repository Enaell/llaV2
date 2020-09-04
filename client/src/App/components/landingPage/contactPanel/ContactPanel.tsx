import React from 'react'
import { Column, Row } from '../../common/Flexbox'
import { TextField } from '@material-ui/core';
import translate from 'counterpart';
import { WhiteButton } from '../../common/GenericComponents';

export const ContactPanel = () => {
  return (
    <Column vertical={'space-between'} horizontal={'center'} style={{width: '100%', maxWidth: '800px', padding: '40px', backgroundColor: 'white', borderRadius: '30px', marginTop: '40px'}}>
      <Row width='100%' horizontal='space-between'>
        <TextField
          required
          margin="dense"
          id="name"
          label={translate('connection.username')}
          type="text"
          onChange={()=>{}}
          style={{width: '40%'}}
        />
        <TextField
          required
          margin="dense"
          id="email"
          label={translate('connection.email')}
          type="email"
          onChange={()=>{}}
          style={{width: '40%'}}
        />
      </Row>
      <TextField
        required
        margin="dense"
        id="subject"
        label={translate('connection.subject')}
        type="text"
        onChange={()=>{}}
        fullWidth
      />
      <TextField
        required
        margin="dense"
        id="comments"
        label={'Comments'}
        type="text"
        onChange={()=>{}}
        multiline
        rows={6}
        rowsMax={10}  
        fullWidth
      />
      <WhiteButton variant='outlined' type='submit' onClick={(e)=> {e.preventDefault();}} style={{marginTop: '30px'}}> {translate('connection.send')}</WhiteButton>
    </Column>
  );
}